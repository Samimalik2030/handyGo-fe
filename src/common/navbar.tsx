
import {
  Container,
  Group,
  Burger,
  Drawer,
  Button,
  Stack,
  Text,
  Anchor,
  Avatar,
  Flex,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { IUser } from "./interfaces/user";


const Navbar = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const user:IUser  = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;
console.log(user,'user')
  return (
    <header style={{ backgroundColor: "#40c057ff" }}>
      <Container fluid px="xl" py="md" style={{ color: "white" }}>
        <Flex justify="space-between">
          <Text
            fw={700}
            fz="xl"
            style={{ color: "white", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            HandyGo
          </Text>
{/* 
          <Group visibleFrom="sm">
            <Anchor c={"white"} onClick={() => navigate("/")}>
              Home
            </Anchor>
            <Anchor c={"white"}>Services</Anchor>
            <Anchor c={"white"}> Mechanic</Anchor>
            <Anchor c={"white"}>Bookings</Anchor>
          </Group> */}
          {user ? (
            <Group>
              <Button variant="outline" color="white" onClick={() => navigate("/dashboard/bookings")}>
                Dashboard
              </Button>
              <Avatar color="white" size={"md"} src={user.profileImage?.url}/>
            </Group>
          ) : (
            <Button onClick={() => navigate("/sign-in")}>Login</Button>
          )}

          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            color="white"
          />
        </Flex>
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        padding="md"
        title="Menu"
        hiddenFrom="sm"
        size="xs"
      >
        <Stack>
          <Anchor c="white" onClick={() => navigate("/")}>
            Home
          </Anchor>
          <Anchor c="white">Services</Anchor>
          <Anchor c="white">Mechanics</Anchor>
          <Anchor c="white" onClick={() => navigate("/dashboard/bookings")}>
            Bookings
          </Anchor>

          {user ? (
            <Button
              color="#2A8C82"
              radius="xl"
              component="a"
              onClick={() => {
                close();
                navigate("/dashboard/bookings");
              }}
            >
              Dashboard
            </Button>
          ) : (
            <Button
              color="#2A8C82"
              radius="xl"
              component="a"
              onClick={() => {
                close();
                navigate("/sign-in");
              }}
            >
              Login
            </Button>
          )}
        </Stack>
      </Drawer>
    </header>
  );
};

export default Navbar;
