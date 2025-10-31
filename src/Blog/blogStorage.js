export const BLOG_METRICS_EVENT = "rraynex-blog-metrics";
export const BLOG_METRICS_STORAGE_KEY = "rraynex_blog_metrics_v1";
const STORAGE_KEY = BLOG_METRICS_STORAGE_KEY;
const memoryStore = {};

const clone = (value) => JSON.parse(JSON.stringify(value ?? {}));

const defaultEntry = () => ({
	likes: 0,
	liked: false,
	shares: 0,
	comments: []
});

const normaliseEntry = (entry = {}) => ({
	likes: typeof entry.likes === "number" && entry.likes >= 0 ? entry.likes : 0,
	liked: Boolean(entry.liked),
	shares: typeof entry.shares === "number" && entry.shares >= 0 ? entry.shares : 0,
	comments: Array.isArray(entry.comments) ? entry.comments : []
});

const broadcast = (data) => {
	if (typeof window === "undefined") {
		return;
	}

	window.dispatchEvent(
		new CustomEvent(BLOG_METRICS_EVENT, {
			detail: clone(data)
		})
	);
};

const readStore = () => {
	let store;

	if (typeof window !== "undefined") {
		try {
			const raw = window.localStorage.getItem(STORAGE_KEY);
			store = raw ? JSON.parse(raw) : undefined;
		} catch (error) {
			console.warn("Unable to read blog metrics store", error);
		}
	}

	if (!store || typeof store !== "object") {
		store = clone(memoryStore);
	}

	return Object.keys(store).reduce((acc, key) => {
		acc[key] = normaliseEntry(store[key]);
		return acc;
	}, {});
};

const writeStore = (data) => {
	const payload = clone(data);

	if (typeof window !== "undefined") {
		try {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
		} catch (error) {
			console.warn("Unable to persist blog metrics store", error);
		}
	}

	Object.keys(memoryStore).forEach((key) => delete memoryStore[key]);
	Object.assign(memoryStore, payload);
};

const updateEntry = (slug, updater) => {
	if (!slug) {
		return normaliseEntry();
	}

	const store = readStore();
	const current = store[slug] ? normaliseEntry(store[slug]) : defaultEntry();
	const next = normaliseEntry(updater(current));
	const nextStore = { ...store, [slug]: next };

	writeStore(nextStore);
	broadcast(nextStore);

	return next;
};

export const getMetrics = (slug) => {
	const store = readStore();
	return store[slug] ? normaliseEntry(store[slug]) : defaultEntry();
};

export const getAllMetrics = () => readStore();

export const toggleLike = (slug) => updateEntry(slug, (entry) => {
	const nextLiked = !entry.liked;
	const nextLikes = Math.max(0, entry.likes + (nextLiked ? 1 : -1));
	return { ...entry, liked: nextLiked, likes: nextLikes };
});

export const addComment = (slug, comment) => updateEntry(slug, (entry) => {
	const trimmedName = comment?.name?.trim();
	const trimmedMessage = comment?.message?.trim();

	if (!trimmedMessage) {
		return entry;
	}

	const commentWithMeta = {
		id:
			typeof crypto !== "undefined" && crypto.randomUUID
				? crypto.randomUUID()
				: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
		name: trimmedName || "Anonymous",
		message: trimmedMessage,
		createdAt: new Date().toISOString()
	};

	return {
		...entry,
		comments: [...entry.comments, commentWithMeta]
	};
});

export const incrementShare = (slug) => updateEntry(slug, (entry) => ({
	...entry,
	shares: entry.shares + 1
}));
