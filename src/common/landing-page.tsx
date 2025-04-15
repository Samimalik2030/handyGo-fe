import {
  Anchor,
  Button,
  Card,
  Container,
  Flex,
  Group,
  Stack,
  Title,
  Text,
  TextInput,
  Image,
  SimpleGrid,
  Box,
  Paper,
  Divider,
  Select,
  Avatar,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "./interfaces/user";

export default function LandingPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const form = useForm({
    initialValues: {
      city: "",
      area: "",
    },
  });

  useEffect(() => {
    const user: IUser | null = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null;
    setUser(user);
  }, []);

  const handleSubmit = () => {
    navigate("/indexing", {
      state: {
        ...form.values,
      },
    });
  };

  return (
    <>
      <Container fluid mt={12}>
        <Stack gap={60}>
          <Card bg={"#40c057ff"} h={"96vh"}>
            <Card bg={"transparent"} pt={20}>
              <Flex justify={"space-between"} align={"center"}>
                <Flex gap={50}>
                  <Group>
                    <Anchor c={"white"}>HANDYGO</Anchor>
                  </Group>
                  <Flex gap={30}>
                    <Anchor
                      c={"white"}
                      onClick={() =>
                        navigate("/sign-up", {
                          state: {
                            role: "Mechanic",
                          },
                        })
                      }
                    >
                      APPLY TO BE A MECHANIC
                    </Anchor>

                    <Anchor c={"white"}>OUR SERVICES</Anchor>
                    <Anchor c={"white"}>ABOUT US</Anchor>
                  </Flex>
                </Flex>
                <Flex gap={10}>
                  {user ? (
                    <Group>
                      <Button
                        variant="outline"
                        color="white"
                        onClick={() => navigate("/dashboard/bookings")}
                      >
                        Dashboard
                      </Button>
                      <Avatar
                        color="white"
                        size={"md"}
                        src={user.profileImage?.url}
                      />
                    </Group>
                  ) : (
                    <Button onClick={() => navigate("/sign-in")}>Login</Button>
                  )}

                  {!user && (
                    <Button
                      bg={"transparent"}
                      style={{ border: "2px solid white" }}
                      onClick={() => navigate("/sign-up")}
                    >
                      GET STARTED
                    </Button>
                  )}
                </Flex>
              </Flex>
            </Card>
            <Card bg={"transparent"} w={"100%"} mt={40}>
              <Flex gap={10}>
                <Card w={"60%"} bg={"transparent"}>
                  <Stack>
                    <Title c={"white"} fw={700} fz={42}>
                      Book vehicles repairing & servicing, without hassle
                    </Title>
                    <Text fw={600} fz={16} c={"white"}>
                      Find trusted garages & mechanics that come to you, with
                      next-day availability.
                    </Text>
                    <Card radius={"100px"} w={"100%"} bg={"#66d07a"}>
                      <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Flex gap={10}>
                          <Select
                            radius={30}
                            w={"50%"}
                            size="lg"
                            placeholder="Your City"
                            data={[
                              "Multan",
                              "Lahore",
                              "Islamabad",
                              "Karachi",
                              "Rawalpindi",
                              "Faisalabad",
                            ]}
                            {...form.getInputProps("city")}
                          />
                          <TextInput
                            radius={30}
                            h={50}
                            w={"50%"}
                            size="lg"
                            placeholder="Your Area"
                            {...form.getInputProps("area")}
                          />
                          <Button
                            h={46}
                            w={130}
                            radius={30}
                            fz={16}
                            variant="outline"
                            bg={"#309945"}
                            c={"white"}
                            type="submit"
                          >
                            Search
                          </Button>
                        </Flex>
                      </form>
                    </Card>
                    <Group justify="end"></Group>
                  </Stack>
                </Card>
                <Card w={"40%"} bg={"transparent"}>
                  <Image
                    src={
                      "https://ik.imagekit.io/xf3wbji6t/hero_image_desktop-08e3eaac39db4404c62da49ee7c4cd83.png?updatedAt=1743237928837"
                    }
                  />
                </Card>
              </Flex>
            </Card>
          </Card>

          <Stack gap={30}>
            <Text fz={24} ta={"center"}>
              HOW IT WORKS
            </Text>
            <Title ta={"center"}>
              Book a trusted mechanic in just a few clicks
            </Title>
            <SimpleGrid cols={3} spacing={20}>
              <Card bg={"transparent"}>
                <Stack>
                  <Flex justify={"center"}>
                    <Box w={"80px"} h={80}>
                      <Image
                        src={
                          "https://ik.imagekit.io/yzrrrgg3d/price-quote-logo.webp?updatedAt=1743590997794"
                        }
                      ></Image>
                    </Box>
                  </Flex>
                  <Title fz={28} ta={"center"}>
                    Get an instant price quote
                  </Title>
                  <Text fz={16} ta={"center"}>
                    Select your car and location, tell us what's wrong, and
                    we'll give you an instant fixed price in seconds
                  </Text>
                </Stack>
              </Card>
              <Card bg={"transparent"}>
                <Stack>
                  <Flex justify={"center"}>
                    <Box w={"80px"} h={80}>
                      <Image
                        src={
                          "https://ik.imagekit.io/yzrrrgg3d/calendar.webp?updatedAt=1743590972836"
                        }
                      />
                    </Box>
                  </Flex>
                  <Title fz={28} ta={"center"}>
                    Pick a date, time & location
                  </Title>
                  <Text fz={16} ta={"center"}>
                    Your mechanic will come to whichever address suits you best,
                    at the date and time of your choice.
                  </Text>
                </Stack>
              </Card>
              <Card bg={"transparent"}>
                <Stack>
                  <Flex justify={"center"}>
                    <Box w={"80px"} h={80}>
                      <Image
                        src={
                          "https://ik.imagekit.io/yzrrrgg3d/pc.webp?updatedAt=1743590972777"
                        }
                      />
                    </Box>
                  </Flex>
                  <Title fz={28} ta={"center"}>
                    Mechanic comes to you
                  </Title>
                  <Text fz={16} ta={"center"}>
                    No need to go to the garage - once booked just sit back and
                    relax while the mechanic comes to you.
                  </Text>
                </Stack>
              </Card>
            </SimpleGrid>
            <Flex justify={"center"}>
              <Button
                w={210}
                c={"#40c057ff"}
                fz={16}
                radius={30}
                h={48}
                bg={"transparent"}
                style={{ border: "1px solid #40c057ff" }}
                onClick={() =>
                  navigate("/indexing", {
                    state: {
                      city: "",
                      area: "",
                    },
                  })
                }
              >
                FIND OUT MORE
              </Button>
            </Flex>
          </Stack>

          <Flex justify={"center"} h={"80vh"}>
            <Card bg={"transparent"} mt={20} w={"90%"}>
              <Flex gap={40}>
                <Card bg={"transparent"} w={"40%"} p={0} radius={30}>
                  <Image
                    h={450}
                    radius={30}
                    src={
                      "https://ik.imagekit.io/xf3wbji6t/about_us_400x500-e761a4b894fb46451e19937192f37993.jpg?updatedAt=1743242464692"
                    }
                  />
                </Card>
                <Card bg={"transparent"} w={"60%"}>
                  <Stack>
                    <Stack gap={40}>
                      <Stack gap={15}>
                        <Text fz={18}>ABOUT US</Text>
                        <Title fz={28}>Our promise to you</Title>
                      </Stack>

                      <Stack>
                        <Text fz={16}>
                          Ever thought car repair was a nightmare? We did! Which
                          is why we're here to make fixing your vehicle as
                          stress free as possible.
                        </Text>
                        <Text fz={16}>
                          Whether it's your clutch or cambelt, alternator or air
                          filter, or just need an MOT and service, our
                          state-of-the-art quoting engine will give you an
                          instant upfront quote based on industry standard data.
                          This means you'll be getting a fair price, which could
                          save you up to 50%.
                        </Text>
                        <Text fz={16}>
                          If you're happy with your quote, simply place your
                          booking and one of our vetted car mechanics will fix
                          your car or van for the price stated. Not only this
                          but they'll come to you (you don't even have to leave
                          your living room!).
                        </Text>
                      </Stack>
                    </Stack>

                    {/* <Button
                      w={210}
                      c={"#40c057ff"}
                      fz={16}
                      radius={30}
                      h={48}
                      bg={"transparent"}
                      style={{ border: "1px solid #40c057ff" }}
                    >
                      FIND OUT MORE
                    </Button> */}
                  </Stack>
                </Card>
              </Flex>
            </Card>
          </Flex>

          <Card bg={"#f1f6ff"} px={60} py={60}>
            <Stack gap={40}>
              <Stack>
                <Text fz={18} ta={"center"}>
                  OUR SERVICES
                </Text>
                <Title ta={"center"} fz={30}>
                  All the ways we can help
                </Title>
              </Stack>
              <Flex justify={"center"}>
                <SimpleGrid cols={3} w={"70%"}>
                  <Card radius={15}>
                    <Stack>
                      <Flex justify={"center"}>
                        <Box w={"80px"} h={80}>
                          <Image
                            height={"100%"}
                            style={{
                              objectFit: "contain",
                            }}
                            src={
                              "https://ik.imagekit.io/yzrrrgg3d/icon%20screw.svg?updatedAt=1743593336899"
                            }
                          />
                        </Box>
                      </Flex>
                      <Title ta={"center"} fz={22}>
                        Repairs
                      </Title>
                    </Stack>
                  </Card>
                  <Card radius={15}>
                    <Stack>
                      <Flex justify={"center"}>
                        <Box w={"80px"} h={80}>
                          <Image
                            height={"100%"}
                            style={{
                              objectFit: "contain",
                            }}
                            src={
                              "https://ik.imagekit.io/yzrrrgg3d/icon-diagnostic.svg?updatedAt=1743593336528"
                            }
                          />
                        </Box>
                      </Flex>
                      <Title ta={"center"} fz={22}>
                        Diagnostics
                      </Title>
                    </Stack>
                  </Card>
                  <Card radius={15}>
                    <Stack>
                      <Flex justify={"center"}>
                        <Box w={"80px"} h={80}>
                          <Image
                            height={"100%"}
                            style={{
                              objectFit: "contain",
                            }}
                            src={
                              "https://ik.imagekit.io/yzrrrgg3d/icon-service.svg?updatedAt=1743593387608"
                            }
                          />
                        </Box>
                      </Flex>
                      <Title ta={"center"} fz={22}>
                        servicing
                      </Title>
                    </Stack>
                  </Card>
                  <Card radius={15}>
                    <Stack>
                      <Flex justify={"center"}>
                        <Box w={"80px"} h={80}>
                          <Image
                            height={"100%"}
                            style={{
                              objectFit: "contain",
                            }}
                            src={
                              "https://ik.imagekit.io/yzrrrgg3d/icon-mot.svg?updatedAt=1743593336468"
                            }
                          />
                        </Box>
                      </Flex>
                      <Title ta={"center"} fz={22}>
                        MOT
                      </Title>
                    </Stack>
                  </Card>
                  <Card radius={15}>
                    <Stack>
                      <Flex justify={"center"}>
                        <Box w={"80px"} h={80}>
                          <Image
                            height={"100%"}
                            style={{
                              objectFit: "contain",
                            }}
                            src={
                              "https://ik.imagekit.io/yzrrrgg3d/icon-tyre.svg?updatedAt=1743593336343"
                            }
                          />
                        </Box>
                      </Flex>
                      <Title ta={"center"} fz={22}>
                        Tyres
                      </Title>
                    </Stack>
                  </Card>
                  <Card radius={15}>
                    <Stack>
                      <Flex justify={"center"}>
                        <Box w={"80px"} h={80}>
                          <Image
                            height={"100%"}
                            style={{
                              objectFit: "contain",
                            }}
                            src={
                              "https://ik.imagekit.io/yzrrrgg3d/icon-inspection.svg?updatedAt=1743593387412"
                            }
                          />
                        </Box>
                      </Flex>
                      <Title ta={"center"} fz={22}>
                        Pre-purchase inspection
                      </Title>
                    </Stack>
                  </Card>
                </SimpleGrid>
              </Flex>
            </Stack>
          </Card>

          <Stack gap={0}>
            <Flex justify={"center"}>
              <Card px={60} py={100} w={"100%"} bg={"#fafafa"}>
                <Flex justify={"center"}>
                  <Card radius={15} w={"40%"}>
                    <Stack mt={20}>
                      <Title fz={28}>Apply to be a mechanic</Title>
                      <Text fz={18} w={"90%"}>
                        Join HandyGo as a mechanic or garage and accept the work
                        you want. Free to join, with great perks and discounts.
                      </Text>
                      <Button
                        w={250}
                        h={44}
                        radius={30}
                        fz={18}
                        onClick={() =>
                          navigate("/sign-up", {
                            state: {
                              role: "Mechanic",
                            },
                          })
                        }
                      >
                        Work with HandyGO
                      </Button>
                    </Stack>
                  </Card>
                  <Card radius={6} w={"40%"} p={0}>
                    <Image
                      src={
                        "https://ik.imagekit.io/xf3wbji6t/hero_pressure-test-b009a622df91a2fda09116419be0c283.webp?updatedAt=1743242542849"
                      }
                    />
                  </Card>
                </Flex>
              </Card>
            </Flex>

            <Stack gap={40} bg={"#fafafa"} h={600}>
              <Title ta={"center"}>What our customers are saying</Title>
              <Flex justify={"center"}>
                <SimpleGrid cols={3} spacing={20} w={"85%"}>
                  <Paper withBorder shadow="lg" pb={12}>
                    <Stack>
                      <Image
                        src={
                          "https://ik.imagekit.io/xf3wbji6t/pexels-sab-wang-62948913-31260162.jpg?updatedAt=1743265739734"
                        }
                      />
                      <Stack gap={6}>
                        <Text fz={18} fw={700} ta={"center"}>
                          SImon Rebbitt
                        </Text>
                        <Text ta={"center"} c={"#cfd0db"}>
                          BMW 5 SERIES
                        </Text>
                      </Stack>
                      <Flex justify={"center"}>
                        <Text fz={16} w={"80%"}>
                          The support staff are on hand to help, and the work
                          gets done quickly and at a very compititive price
                        </Text>
                      </Flex>
                    </Stack>
                  </Paper>
                  <Paper withBorder shadow="lg">
                    <Stack>
                      <Image
                        src={
                          "https://ik.imagekit.io/xf3wbji6t/pexels-michael-kessel-112079563-31299142.jpg?updatedAt=1743267500936"
                        }
                      />
                      <Stack gap={6}>
                        <Text fz={18} fw={700} ta={"center"}>
                          Barbara Mansour
                        </Text>
                        <Text ta={"center"} c={"#cfd0db"}>
                          VOLKSWAGEN GOLF IV
                        </Text>
                      </Stack>
                      <Flex justify={"center"}>
                        <Text fz={16} w={"80%"}>
                          The support staff are on hand to help, and the work
                          gets done quickly and at a very compititive price
                        </Text>
                      </Flex>
                    </Stack>
                  </Paper>
                  <Paper withBorder shadow="lg">
                    <Stack>
                      <Image
                        src={
                          "https://ik.imagekit.io/xf3wbji6t/pexels-jordi-costa-tome-2150075542-31293423.jpg?updatedAt=1743267562319"
                        }
                      />
                      <Stack gap={6}>
                        <Text fz={18} fw={700} ta={"center"}>
                          Andrew Campbell
                        </Text>
                        <Text ta={"center"} c={"#cfd0db"}>
                          AUDI A4
                        </Text>
                      </Stack>
                      <Flex justify={"center"}>
                        <Text fz={16} w={"80%"}>
                          The support staff are on hand to help, and the work
                          gets done quickly and at a very compititive price
                        </Text>
                      </Flex>
                    </Stack>
                  </Paper>
                </SimpleGrid>
              </Flex>
            </Stack>
          </Stack>

          <Flex justify={"center"}>
            <Card w={"70%"}>
              <Stack>
                <Flex justify={"center"} align={"center"} gap={10}>
                  <Text>Vetted mechanics</Text>
                  <Box
                    w={6}
                    h={6}
                    style={{ borderRadius: "15px" }}
                    bg={"#afafb1ff"}
                  ></Box>
                  <Text>Save up to 50%</Text>
                  <Box
                    w={6}
                    h={6}
                    style={{ borderRadius: "15px" }}
                    bg={"#afafb1ff"}
                  ></Box>
                  <Text>Fast online booking</Text>
                </Flex>
              </Stack>
            </Card>
          </Flex>
        </Stack>
      </Container>
    </>
  );
}
