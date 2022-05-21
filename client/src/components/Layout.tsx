import { Container, Flex } from "@chakra-ui/react";
import React from "react";

interface ILayout {
  children: React.ReactNode;
  isHeaderVisible?: boolean;
  isFooterVisible?: boolean;
  [restProps: string]: any;
}

export default function Layout({ children, isHeaderVisible, isFooterVisible, ...restProps }: ILayout) {
  return (
    <Flex flexDir="column" {...restProps}>
      {/* {isHeaderVisible && <NavBar />} */}

      <Container maxW="80em" minHeight="calc(100vh - 100px)" p="2rem 1.5rem" borderRadius="10px">
        {children}
      </Container>

      {/* {isFooterVisible && <Footer />} */}
    </Flex>
  );
}
