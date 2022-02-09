import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

const Navigation = () => {
  const router = useRouter();
  return (
    <Menu
      inverted
      borderless
      style={{ padding: ".3rem", marginBottom: "20px" }}
      attached
    >
      <Container>
        <Menu.Item name="home">
          <Link href="/">Home</Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Button
              size="mini"
              primary
              onClick={() => router.push("/tasks/new")}
            >
              New task
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default Navigation;
