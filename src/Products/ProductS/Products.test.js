jest.mock("react-router-dom", () => ({
  Link: ({ children, ...props }) => <div {...props}>{children}</div>,
  NavLink: ({ children, ...props }) => <div {...props}>{children}</div>,
  useParams: () => ({}),
  useNavigate: () => jest.fn(),
}));

import { PRODUCTS, PRODUCT_NARRATIVES } from "./Products";

describe("product catalog coverage", () => {
  const requiredProducts = [
    { slug: "product-illaprazole", name: "Illaprazole" },
    { slug: "product-orlistat", name: "Orlistat" },
    { slug: "product-tamsulosin-dutasteride", name: "Tamsulosin" },
    { slug: "product-dexlansoprazole", name: "Dexlansoprazole" },
    { slug: "product-lansoprazole", name: "Lansoprazole" },
    { slug: "product-itraconazole", name: "Itraconazole" },
    { slug: "product-esomeprazole-mups", name: "Esomeprazole" },
    { slug: "product-dexlansoprazole-mups", name: "Dexlansoprazole" },
    { slug: "product-itopride", name: "Itopride" },
    { slug: "product-rabeprazole-itopride", name: "Rabeprazole" },
    { slug: "product-pantoprazole-itopride", name: "Pantoprazole" },
    { slug: "product-rabeprazole-levosulpiride", name: "Rabeprazole" },
    { slug: "product-pantoprazole-levosulpiride", name: "Pantoprazole" },
    { slug: "product-esomeprazole-levosulpiride", name: "Esomeprazole" },
    { slug: "product-rabeprazole-domperidone", name: "Rabeprazole" },
    { slug: "product-pantoprazole-domperidone", name: "Pantoprazole" },
    { slug: "product-omeprazole", name: "Omeprazole" },
  ];

  it("includes each required canonical product entry", () => {
    requiredProducts.forEach(({ slug, name }) => {
      const product = PRODUCTS.find((entry) => entry.slug === slug);
      expect(product).toBeDefined();
      expect(product.name).toContain(name);
    });
  });

  it("includes a narrative entry for each canonical product", () => {
    requiredProducts.forEach(({ slug }) => {
      expect(PRODUCT_NARRATIVES[slug]).toBeDefined();
      expect(Array.isArray(PRODUCT_NARRATIVES[slug])).toBe(true);
      expect(PRODUCT_NARRATIVES[slug].length).toBeGreaterThan(0);
    });
  });
});
