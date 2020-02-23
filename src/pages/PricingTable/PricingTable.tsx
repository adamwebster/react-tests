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
  Price,
  StyledTextarea
} from "./styles";
import {
  CornerDialog,
  ToastProvider,
  useToast,
} from "@adamwebster/fused-components";

const NeedHelp = () => {
  const [dialogVisible, setDialogVisible] = useState(true);

  const toast = useToast();

 const sendMessage = () => {
     setDialogVisible(false);
    toast?.addInfo("Thanks for your message", "We will get back to you soon.", {
      duration: 5
    });
  };
  return (
    <CornerDialog
      confirmText="Send"
      visible={dialogVisible}
      onCloseClick={() => setDialogVisible(false)}
      onConfirmClick={() => sendMessage()}
      cancelText="Not Now"
      icon="info-circle"
      fcStyle="info"
      title="Need Help?"
    >
      Need help feel free to send us a message and we will get back to you soon.
      <StyledTextarea placeholder="Enter your message here..." />
    </CornerDialog>
  );
};

interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  children?: any;
  primary?: boolean;
  buttonColor?: string;
}
const CardButton = ({children, primary, buttonColor}:ButtonProps) =>{
  const toast = useToast();

  const ButtonClick = () =>{
    toast?.addInfo("This is where your an sales pitch would be shown", undefined, {
      id: "1",
      duration: 5
    });
  }

  return (
    <StyledButton primary={primary} buttonColor={buttonColor} onClick={() => ButtonClick()}>
      {children}
    </StyledButton>
  )
}

const PricingTable = () => {
  const ButtonText = "LEARN MORE";
  const [active, setActive] = useState(false);

 
  return (
    <>
      <ToastProvider>
        <NeedHelp />
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
            <CardButton primary>{ButtonText}</CardButton>
          </PricingCard>
          <PricingCard bgColor="purple">
            <h2> Professional</h2>
            <Price>${active ? "279.99" : "24.99"}</Price>
            <StyledList>
              <li>1 TB Storage</li>
              <li>5 Users Allowed</li>
              <li>Send up to 10 GB</li>
            </StyledList>
            <CardButton primary buttonColor="#fff">
              {ButtonText}
            </CardButton>
          </PricingCard>
          <PricingCard primaryButton>
            <h2> Master</h2>
            <Price>${active ? "449.99" : "39.99"}</Price>
            <StyledList>
              <li>2 TB Storage</li>
              <li>10 Users Allowed</li>
              <li>Send up to 20 GB</li>
            </StyledList>
            <CardButton primary>{ButtonText}</CardButton>
          </PricingCard>
        </PricingTableStyled>
      </PricingWrapper>
      </ToastProvider>

    </>
  );
};

export default PricingTable;
