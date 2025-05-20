import {
  Avatar,
  Badge,
  Button,
  Card,
  Flex,
  Group,
  Select,
  Stack,
  TextInput,
  Title,
  Text,
  Modal,
  MultiSelect,
  Box,
  Center,
  Container,
  PasswordInput,
  Textarea,
} from "@mantine/core";
import IconEye from "../assets/IconEye";
import IconLocation from "../assets/IconLocation";
import IconPhone from "../assets/IconPhone";
import Navbar from "./navbar";
import { useForm } from "@mantine/form";
import { DateInput, TimeInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { useLocation } from "react-router-dom";
import api from "../api";
import { useEffect, useState } from "react";
import { Workshop } from "./interfaces/workshop";
import { IUser } from "./interfaces/user";
import { notifications } from "@mantine/notifications";
import WorkshopDetails from "../features/bookings/customer/workshop-details";

export default function WorkshopIndexing() {
  const location = useLocation();

  const [workshops, setWorkshops] = useState<Workshop[] | []>([]);
  const [newUser, setNewUser] = useState<IUser | null>(null);

  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(
    null
  );

  

  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [openedDetails, { open: openDetailModal, close: closeDetailModal }] = useDisclosure(false);

  const [
    openedSignUpModal,
    { open: openSignUpModal, close: closeSignUpModal },
  ] = useDisclosure(false);

  const values = location?.state;

  useEffect(() => {
    const getWorkshops = async () => {
      const response = await api.get(
        `/workshops?city=${values.city}&area=${values.area}`
      );
      setWorkshops(response.data);
    };
    getWorkshops();
    const user: IUser | null = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null;
    setNewUser(user);
  }, []);

  const bookingForm = useForm({
    initialValues: {
      date: "",
      time: "",
      services: [],
      problemDescription: "",
      serviceType: "",
      status: "pending",
    },
  });
  const searchForm = useForm({
    initialValues: {
      name: "",
      city: values?.city ?? "",
      area: values?.area ?? "",
    },
  });
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Customer",
    },
  });
  const handleSubmit = async () => {
    if (!newUser) {
      openSignUpModal();
    }
    if (
      bookingForm.values.serviceType === "mobile_service" &&
      selectedWorkshop?.serviceMode !== "mobile_service"
    ) {
      notifications.show({
        message:
          "You can not book this workshop as they do not provide mobile service",
        color: "red",
      });
      return;
    }
    const response = await api.post("/bookings", {
      ...bookingForm.values,
      user: newUser,
      workshop: selectedWorkshop,
      status: "pending",
    });
    if (response.data) {
      setSelectedWorkshop(null);
      bookingForm.setValues({
        date: "",
        time: "",
        services: [],
        problemDescription: "",
        status: "",
      });
      closeModal();
    }
  };

  async function handleSignUpSubmit() {
    const response = await api.post("/auth/sign-up", form.values);
    if (response.data) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    closeSignUpModal();
  }
  const handleSearch = async () => {
    try {
      const { name, city, area } = searchForm.values;

      const queryParams = new URLSearchParams();

      if (name?.trim()) queryParams.append("name", name.trim());
      if (city?.trim()) queryParams.append("city", city.trim());
      if (area?.trim()) queryParams.append("area", area.trim());

      const queryString = queryParams.toString();

      const url = queryString ? `/workshops?${queryString}` : "/workshops";

      const response = await api.get(url);
      setWorkshops(response.data);
    } catch (error) {
      console.error("Error fetching workshops:", error);
    }
  };

  const handleOpenModal = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    if(!newUser){
      openSignUpModal()
    }
    openModal();
  };

const handleOpenDetails = (workshop:Workshop) =>{
  setSelectedWorkshop(workshop)
  openDetailModal()
}
const handleCloseDetails = () =>{
  setSelectedWorkshop(null)
  closeDetailModal()
}
  return (
    <>
      <Navbar />
      <Container fluid>
        <form onSubmit={searchForm.onSubmit(handleSearch)}>
          <Group justify="flex-end" mt={20} mr={20}>
            <TextInput
              placeholder="Search by Name"
              {...searchForm.getInputProps("name")}
            />
            <Select
              data={[
                "Multan",
                "Lahore",
                "Islamabad",
                "Karachi",
                "Rawalpindi",
                "Faisalabad",
              ]}
              placeholder="Search by City"
              {...searchForm.getInputProps("city")}
              clearable
            />
            <TextInput
              placeholder="Search by Area"
              {...searchForm.getInputProps("area")}
            />
            <Button type="submit">Apply Search</Button>
          </Group>
        </form>
        {workshops.length > 0 && <Text> {workshops.length} result found</Text>}

        <Flex wrap={"wrap"} gap={"xl"}>
          {workshops.map((workshop) => (
            <>
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                w={350}
                mt={12}
               style={{
                cursor:"pointer"
               }}
               onClick={()=>handleOpenDetails(workshop)}
              >

                <Card.Section withBorder>
                  <Flex h={150} align={"center"} px={"sm"} gap={"xl"}>
                    <Stack>
                      <Avatar size={"xl"} src={workshop?.logo?.url} />
                    </Stack>
                    <Stack h={"100%"} py={"xs"}>
                      <Title
                        order={4}
                        c={"#40c057ff"}
                        style={{
                          fontFamily: "cursive",
                        }}
                      >
                        {workshop?.name}
                      </Title>
                      <Stack gap={2}>
                        <Group gap={"xs"}>
                          <IconEye />
                          <Text c={"dimmed"}>{workshop?.workshopType}</Text>
                        </Group>
                        <Group gap={"xs"}>
                          <IconLocation height="20" width="20" />
                          <Text c={"dimmed"}>{workshop?.city}</Text>
                        </Group>
                        <Group gap={"xs"}>
                          <IconPhone height="18" width="18" />
                          <Text c={"dimmed"}>{workshop?.contactNumber}</Text>
                        </Group>
                      </Stack>
                    </Stack>
                  </Flex>
                </Card.Section>
                <Stack>
                  <Group justify="end">
                    {/* <Badge color="green" variant="light" mt="sm" size="sm">
              Available
            </Badge> */}
                  </Group>
                  <Group justify="space-between">
                    <Text>Timings</Text>
                    <Text c={"dimmed"}>
                      {workshop.openingTime} to {workshop.closingTime}
                    </Text>
                  </Group>
                  <Group justify="space-between">
                    <Text> Days</Text>
                    <Flex gap={2}>
                      {workshop.workingDays.map((day) => (
                        <Badge
                          key={day}
                          color="green"
                          variant="light"
                          size="xs"
                        >
                          {day}
                        </Badge>
                      ))}
                    </Flex>
                  </Group>

                  <Text>Services :</Text>
                  <Group>
                    {workshop.selectedServices.map((service) => (
                      <Badge
                        key={service}
                        color="green"
                        variant="light"
                        size="sm"
                      >
                        {service}
                      </Badge>
                    ))}
                  </Group>
                </Stack>

                <Button
                  fullWidth
                  mt="md"
                  onClick={() => handleOpenModal(workshop)}
                >
                  Book Now
                </Button>
              </Card>
            </>
          ))}
        </Flex>
        {workshops.length === 0 && (
          <Text ta={"center"} mt={50}>
            oops! no result found
          </Text>
        )}
      </Container>

      <Modal
        opened={opened}
        onClose={closeModal}
        title="Book a Mechanic"
        centered
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <MultiSelect
              label="Select Services"
              placeholder="Choose services"
              data={[
                "Engine Repair",
                "Brakes",
                "AC Repair",
                "Oil Change",
                "Tire Change & Alignment",
                "Battery Replacement",
                "Bodywork & Painting",
                "Emergency Roadside Assistance",
              ]}
              {...bookingForm.getInputProps("services")}
              required
              clearable
            />
            <DateInput
              {...bookingForm.getInputProps("date")}
              label="Date input"
              placeholder="Date input"
              required
            />
            <TimeInput
              label="Booking Time"
              {...bookingForm.getInputProps("time")}
              required
            />
            <Textarea
              label="Describe problem"
              placeholder="Give some description of the problem"
              {...bookingForm.getInputProps("problemDescription")}
              required
            />

            <Select
              label="Service Type"
              placeholder="What type of service you want"
              {...bookingForm.getInputProps("serviceType")}
              required
              data={[
                { value: "workshop_only", label: "Workshop" },
                { value: "mobile_service", label: "Mobile Service" },
              ]}
            />

            <Button type="submit">Book Now</Button>
          </Stack>
        </form>
      </Modal>

      <Modal
        opened={openedSignUpModal}
        onClose={closeSignUpModal}
        title="Please Sign Up First"
        centered
      >
        <form onSubmit={form.onSubmit(handleSignUpSubmit)}>
          <Stack>
            <TextInput
              label="Full Name"
              placeholder="Enter your full name"
              required
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Email"
              placeholder="Enter your email"
              type="email"
              required
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Create a password"
              required
              {...form.getInputProps("password")}
            />
            <Button type="submit">Sign Up</Button>
          </Stack>
        </form>
      </Modal>


      <Modal opened={openedDetails} onClose={()=>handleCloseDetails()} size={'lg'}>
        <WorkshopDetails workshop={selectedWorkshop}/>
      </Modal>
    </>
  );
}
