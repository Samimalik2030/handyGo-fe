import {
  Button,
  Card,
  Text,
  Center,
  Flex,
  Stack,
  TextInput,
  Title,
  Image,
  Container,
  Group,
  Select,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as yup from "yup";
import api from "../../api";
import { useMediaQuery } from "@mantine/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../common/logo";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const roleOfUser = location?.state?.role;
  const isSmallScreen = useMediaQuery("(max-width: 56.25em)");
  const validateSchema = yup.object({
    fullName: yup.string().required("Full name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    role: yup.string().required("Role is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });
  const form = useForm({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: roleOfUser ?? "",
    },
    validate: yupResolver(validateSchema),
  });
  async function handleSubmit() {
    const response = await api.post("/auth/sign-up", {
      fullName: form.values.fullName,
      email: form.values.email,
      password: form.values.password,
      role: form.values.role,
    });

    if (response.data) {
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("user", response?.data?.user);
      navigate("/dashboard/bookings");
    }
  }

  return (
    <>
      <Container fluid h={"100vh"} w={"100vw"} p={10}>
        <Flex>
          <Card
            p={6}
            w={"50%"}
            h={"98vh"}
            display={isSmallScreen ? "none" : "block"}
          >
            <Image
              radius={20}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={
                "https://ik.imagekit.io/yzrrrgg3d/page.webp?updatedAt=1742744441337"
              }
            />
          </Card>

          <Card
            style={{
              background: "linear-gradient(to bottom, #eaffd1ff, #edfffd)",
              overflow: "auto",
            }}
            w={isSmallScreen ? "100%" : "50%"}
            h={"98vh"}
            radius={20}
          >
            <Flex justify={"end"} align={"center"} gap={15} px={20}>
              <Text fw={400} fz={16}>
                Already have an account?
              </Text>
              <Button
                fw={600}
                fz={16}
                style={{ border: "1px solid #2A8C82" }}
                bg={"transparent"}
                c={"#2A8C82"}
                w={151}
                h={41}
                onClick={() => navigate("/sign-in")}
              >
                Sign In
              </Button>
            </Flex>
            <Center h={"100%"}>
              <Card w={"80%"} bg={"transparent"}>
                <Flex justify={"center"}>
                  <Logo />
                </Flex>
                <Stack gap={8}>
                  <Title fw={600} fz={25} ta={"center"}>
                    Sign <span style={{ color: "#2A8C82" }}>Up</span>
                  </Title>
                  <Text ta={"center"} fw={400} fz={21}>
                    Sign up If you don’t have an account
                  </Text>
                </Stack>
                <form onSubmit={form.onSubmit(() => handleSubmit())}>
                  <Stack gap={13} mt={7}>
                    <TextInput
                      fw={300}
                      fz={9}
                      c={"#6d7572"}
                      label="Full Name"
                      placeholder="Enter Your Full Name"
                      size="md"
                      w={"100%"}
                      radius={16}
                      {...form.getInputProps("fullName")}
                    />
                    <TextInput
                      fw={300}
                      fz={9}
                      c={"#6d7572"}
                      label="Your Email"
                      placeholder="Enter Your Email"
                      size="md"
                      w={"100%"}
                      radius={16}
                      {...form.getInputProps("email")}
                    />
                    <TextInput
                      fw={300}
                      fz={9}
                      c={"#6d7572"}
                      label=" Password"
                      placeholder="Enter Your Password"
                      size="md"
                      w={"100%"}
                      radius={16}
                      {...form.getInputProps("password")}
                    />
                    <TextInput
                      fw={300}
                      fz={9}
                      c={"#6d7572"}
                      //  rightSection={<IconEye />}
                      label="Confirm Password"
                      placeholder="Enter Your Password"
                      size="md"
                      w={"100%"}
                      radius={16}
                      {...form.getInputProps("confirmPassword")}
                    />
                    <Group justify="end">
                      <Text fz={12}>Selected Role:</Text>
                      <Select
                        placeholder="Your Role?"
                        w={110}
                        data={["Mechanic", "Customer"]}
                        variant="unstyled"
                        defaultValue="Mechanic"
                        styles={{
                          input: {
                            color: "green",
                          },
                          section: {
                            display: "none",
                          },
                        }}
                        {...form.getInputProps("role")}
                      />
                    </Group>
                    <Button
                      fw={600}
                      fz={16}
                      w={"100%"}
                      mt={7}
                      h={42}
                      radius={16}
                      bg={"#2A8C82"}
                      type="submit"
                    >
                      Sign Up
                    </Button>
                  </Stack>
                </form>
              </Card>
            </Center>
          </Card>
        </Flex>
      </Container>
    </>
  );
};
export default SignUp;
