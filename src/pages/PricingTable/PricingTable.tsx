import React, { useState, useEffect } from "react";
import PricingCard from "./PricingCard";
import {
  PricingWrapper,
  StyledButton,
  Header,
  PricingTableStyled,
  StyledList,
  ToggleWrapper,
  StyledToggle,
  Price
} from "./styles";
import { useToast, ToastProvider } from "@adamwebster/fused-components";

const Toasts = () => {
  const toast = useToast();
  useEffect(() => {
    const message = setTimeout(() => {
      toast?.addInfo(
        "Need Help?",
        "Give us an email at info@companyname.me"
      );
    }, 1000);
    return () => {
      clearTimeout(message);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

const PricingTable = () => {
  const ButtonText = "LEARN MORE";
  const [active, setActive] = useState(false);
  return (
    <>
      <ToastProvider position="bottom-right">
        <Toasts />
      </ToastProvider>
      <PricingWrapper>
        <Header>
          <h1>Our Pricing</h1>
          <ToggleWrapper>
            Monthly
            <StyledToggle active={active} onClick={() => setActive(!active)} />
            Annually
          </ToggleWrapper>
        </Header>
        <PricingTableStyled>
          <PricingCard>
            <h2>Basic</h2>
            <Price>${active ? "219.99" : "19.99"}</Price>
            <StyledList>
              <li>500 GB Storage</li>
              <li>2 Users Allowed</li>
              <li>Send up to 3 GB</li>
            </StyledList>
            <StyledButton primary>{ButtonText}</StyledButton>
          </PricingCard>
          <PricingCard bgColor="purple">
            <h2> Professional</h2>
            <Price>${active ? "279.99" : "24.99"}</Price>
            <StyledList>
              <li>1 TB Storage</li>
              <li>5 Users Allowed</li>
              <li>Send up to 10 GB</li>
            </StyledList>
            <StyledButton primary buttonColor="#fff">
              {ButtonText}
            </StyledButton>
          </PricingCard>
          <PricingCard primaryButton>
            <h2> Master</h2>
            <Price>${active ? "449.99" : "39.99"}</Price>
            <StyledList>
              <li>2 TB Storage</li>
              <li>10 Users Allowed</li>
              <li>Send up to 20 GB</li>
            </StyledList>
            <StyledButton primary>{ButtonText}</StyledButton>
          </PricingCard>
        </PricingTableStyled>
      </PricingWrapper>
    </>
  );
};

export default PricingTable;
