import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Typography } from "antd";
import { BulbOutlined } from "@ant-design/icons"; // lightbulb icon
import "./card.css";

const { Title, Paragraph } = Typography;

export default function InfoCard({
  title = "Innovation",
  description,
  icon = <BulbOutlined style={{ fontSize: "50px" }} />,
  buttonText = "Know More",
  buttonLink = "/about/vision-and-values",
}) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(buttonLink);
  }

  return (
    <Card
      hoverable
      className="info-card"
      style={{
        width: 350,
        borderRadius: 30,
        textAlign: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}
      styles={{
        body: {
          padding: "12px"
        }
      }}
    >
      {/* Icon */}
      <div style={{ fontSize: "40px", color: "#d26c1fff",marginTop:'25px' }}>
        {icon}
      </div>

      {/* Title */}
      <Title level={4} style={{ fontFamily: "Lexend, sans-serif", marginBottom: "20px", marginTop:'10px' }}>
        {title}
      </Title>

      {/* Description */}
      <Paragraph style={{ fontSize: "14px", color: "#444", marginBottom: "20px", fontFamily: "Lexend, sans-serif",textAlign:'justify'  }}>
        {description}
      </Paragraph>

      {/* Button */}
      <Button
        type="primary"
        size="large"
        block
        style={{
          backgroundColor: "#d26c1fff",
          border: "none",
          borderRadius: "35px",
          fontFamily: "Lexend, sans-serif",
        }}
        onClick={handleClick}
        aria-label={`${title} details`}
      >
        {buttonText}
      </Button>
    </Card>
  );
}
