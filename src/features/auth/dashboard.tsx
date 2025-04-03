import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Flex,
  Group,
  NavLink,
  Stack,
  Title,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import IconSettings from "../../assets/IconSettings";
import IconSettingsPlus from "../../assets/IconSettingsPlus";
import IconBriefCase from "../../assets/IconBriefCase";
import IconService from "../../assets/IconService";
import IconBell from "../../assets/IconBell";
import IconArrowRight from "../../assets/IconArrowRight";
import IconBrand from "../../assets/IconBrand";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Flex justify={"space-between"} align={"center"} px={"lg"}>
          <Group gap={0}>
            <Title
              style={{
                fontFamily: "cursive",
                cursor: "pointer",
              }}
            >
              Handy
            </Title>
            <span
              style={{
                color: "#40c057ff",
                fontSize: "40px",
                fontWeight: 700,
                fontFamily: "cursive",
                cursor: "pointer",
              }}
            >
              GO
            </span>
          </Group>
          <Flex gap={2} align={"center"}>
            <Avatar h={50} w={50} />
            <Box>
              <Text fz={14} truncate w={100} lh={1}>
                Sami Ullah
              </Text>
              <Text truncate w={100} fz={12} lh={1}>
                msamiullah2030@gmail.com
              </Text>
            </Box>
          </Flex>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar
        p="md"
        style={{
          borderRadius: "20px",
        }}
      >
        <Flex direction={"column"} h={"100%"} justify={"space-between"}>
          <Stack gap={"xs"}>
            <NavLink
              label="Bookings"
              leftSection={<IconBriefCase />}
              active={location.pathname === "/dashboard/bookings"}
              onClick={() => navigate("/dashboard/bookings")}
              style={{
                backgroundColor:
                  location.pathname === "/dashboard/bookings"
                    ? "#40c057ff"
                    : "transparent",
                color:
                  location.pathname === "/dashboard/bookings"
                    ? "white"
                    : "black",
                borderRadius: "10px",
              }}
            />
            <NavLink
              label="Service Requests"
              active={location.pathname === "/dashboard/service-requests"}
              onClick={() => navigate("/dashboard/service-requests")}
              leftSection={<IconBrand stroke="currentColor" />}
              style={{
                backgroundColor:
                  location.pathname === "/dashboard/service-requests"
                    ? "#40c057ff"
                    : "transparent",
                color:
                  location.pathname === "/dashboard/service-requests"
                    ? "white"
                    : "black",
                borderRadius: "10px",
              }}
            />
            <NavLink
              label="Workshop Settings"
              active={location.pathname === "/dashboard/workshop-settings"}
              onClick={() => navigate("/dashboard/workshop-settings")}
              leftSection={<IconSettingsPlus />}
              style={{
                backgroundColor:
                  location.pathname === "/dashboard/workshop-settings"
                    ? "#40c057ff"
                    : "transparent",
                color:
                  location.pathname === "/dashboard/workshop-settings"
                    ? "white"
                    : "black",
                borderRadius: "10px",
              }}
            />
            <NavLink
              label="Account Settings"
              leftSection={<IconSettings />}
              active={location.pathname === "/dashboard/account-settings"}
              onClick={() => navigate("/dashboard/account-settings")}
              style={{
                backgroundColor:
                  location.pathname === "/dashboard/account-settings"
                    ? "#40c057ff"
                    : "transparent",
                color:
                  location.pathname === "/dashboard/account-settings"
                    ? "white"
                    : "black",
                borderRadius: "10px",
              }}
            />
          </Stack>

          <Flex
            gap={0}
            style={{
              cursor: "pointer",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f0f0f0")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <Avatar />
            <Group gap={0} justify="space-between" w={"100%"}>
              <NavLink
                w={80}
                label="LogOut"
                style={{
                  fontWeight: 600,
                }}
              />
              <IconArrowRight />
            </Group>
          </Flex>
        </Flex>
      </AppShell.Navbar>

      <AppShell.Main bg={"#f4f5f7"}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Dashboard;
