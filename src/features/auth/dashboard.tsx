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
  Anchor,
  ColorSchemeScript,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import IconSettings from "../../assets/IconSettings";
import IconSettingsPlus from "../../assets/IconSettingsPlus";
import IconBriefCase from "../../assets/IconBriefCase";
import IconArrowRight from "../../assets/IconArrowRight";
import IconBrand from "../../assets/IconBrand";
import { modals } from "@mantine/modals";
import { IUser } from "../../common/interfaces/user";
import api from "../../api";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(true);

  const [opened, { toggle }] = useDisclosure();

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
  const user: IUser | null = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

  const customerRoutes = [
    {
      label: "My Bookings",
      link: "/dashboard/my-bookings",
      icon: <IconBriefCase />,
    },
    {
      label: "Previous Bookings",
      link: "/dashboard/my-completed-bookings",
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
    if (!user) {
      navigate("/sign-in");
    }
  }, []);

  const openLogoutModal = () => {
    modals.openConfirmModal({
      title: "Confirm Logout",
      centered: true,
      children: <p>Are you sure you want to logout?</p>,
      labels: { confirm: "Logout", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/sign-in");
        window.location.reload();
      },
    });
  };
  
  console.log(user,'user')

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
          <Group
            gap={0}
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
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
          <Flex gap={"xl"} align={"center"}>
            {user && user.role === 'Customer' &&(
              <Anchor
                c="#40c057ff"
                onClick={() =>
                  navigate("/indexing", {
                    state: {
                      city: "",
                      area: "",
                    },
                  })
                }
              >
                Book a mechanic
              </Anchor>
            )}
            <Flex gap={8} align={"center"}>
              <Avatar h={50} w={50} src={user?.profileImage?.url} />
              <Box>
                <Text fz={14} truncate w={100} lh={1}>
                  {user?.name}
                </Text>
                <Text truncate w={100} fz={12} lh={1}>
                  {user?.email}
                </Text>
              </Box>
            </Flex>
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
            {user?.role === "Mechanic"
              ? mechanicRoutes.map((route) => (
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
                      color:
                        location.pathname === route.link ? "white" : "black",
                      borderRadius: "10px",
                    }}
                  />
                ))
              : customerRoutes.map((route) => (
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
                      color:
                        location.pathname === route.link ? "white" : "black",
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
            onClick={openLogoutModal}
          >
            <Avatar src={user?.profileImage?.url} />
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
