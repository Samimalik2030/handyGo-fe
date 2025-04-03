import React, { useEffect, useState } from "react";
import {
  AppShell,
  Avatar,
  Box,
  Flex,
  Group,
  NavLink,
  Stack,
  Title,
  Text,
  Alert,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import IconSettings from "../../assets/IconSettings";
import IconSettingsPlus from "../../assets/IconSettingsPlus";
import IconBriefCase from "../../assets/IconBriefCase";
import IconArrowRight from "../../assets/IconArrowRight";
import IconBrand from "../../assets/IconBrand";
import { User } from "../../common/interfaces/user";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [opened, { toggle }] = useDisclosure();
  const [showAlert, setShowAlert] = useState(true); // State to control alert visibility
  const mechanicRoutes = [
    {
      label: "Bookings",
      link: "/dashboard/bookings",
      icon: <IconBriefCase />,
    },
    {
      label: "Service Requests",
      link: "/dashboard/service-requests",
      icon: <IconBrand stroke="currentColor" />,
    },
    {
      label: "Workshop Settings",
      link: "/dashboard/workshop-settings",
      icon: <IconSettingsPlus />,
    },

    {
      label: "Account Settings",
      link: "/dashboard/account-settings",
      icon: <IconSettings />,
    },
  ];
  const user: User | null = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

  const customerRoutes = [
    {
      label: "My Bookings",
      link: "/dashboard/my-bookings",
      icon: <IconBriefCase />,
    },
    {
      label: "Service Requests",
      link: "/dashboard/my-service-requests",
      icon: <IconBrand stroke="currentColor" />,
    },

    {
      label: "Account Settings",
      link: "/dashboard/account-settings",
      icon: <IconSettings />,
    },
  ];

  useEffect(() => {
    // This will run when the component mounts and show the alert
    setShowAlert(true);
  }, []);

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
            {mechanicRoutes.map((route) => (
              <NavLink
                key={route.link}
                label={route.label}
                leftSection={route.icon}
                active={location.pathname === route.link}
                onClick={() => navigate(route.link)}
                style={{
                  backgroundColor:
                    location.pathname === route.link
                      ? "#40c057ff"
                      : "transparent",
                  color: location.pathname === route.link ? "white" : "black",
                  borderRadius: "10px",
                }}
              />
            ))}
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
        {/* Display the alert if showAlert is true */}
        {showAlert && (
          <Alert
            title="Welcome Back!"
            color="red"
            onClose={() => setShowAlert(false)}
            withCloseButton
            // Close alert when user clicks the close button
          >
            Please list your workshop
          </Alert>
        )}
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Dashboard;
