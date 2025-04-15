import {
  Box,
  Card,
  Flex,
  Stack,
  Title,
  Text,
  TextInput,
  NumberInput,
  FileInput,
  Button,
  Avatar,
  Select,
  Chip,
  Group,
  Radio,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import IconHomeEdit from "../../assets/IconHomeEdit";
import IconLocation from "../../assets/IconLocation";
import IconCalendar from "../../assets/IconCalendar";
import IconBrand from "../../assets/IconBrand";
import api from "../../api";
import { IUser } from "../../common/interfaces/user";
import { useEffect, useState } from "react";
import { Workshop } from "../../common/interfaces/workshop";

const WorkshopSettings = () => {
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [file, setFile] = useState({
    fileId: "",
    url: "",
  });
  useEffect(() => {
    async function getWorkshop() {
      const response = await api.get(`/workshops?userId=${user?.id}`);
      const workshopData = response.data[0];
      setWorkshop(workshopData);

      if (workshopData) {
        form.setValues({
          name: workshopData.name,
          workshopType: workshopData.workshopType,
          contactNumber: workshopData.contactNumber,
          city: workshopData.city,
          fullAddress: workshopData.fullAddress,
          selectedServices: workshopData.selectedServices,
          sparePartsAvailable: workshopData.sparePartsAvailable,
          serviceMode: workshopData.serviceMode,
          workingDays: workshopData.workingDays,
          openingTime: workshopData.openingTime,
          closingTime: workshopData.closingTime,
        });

        setFile(workshopData.logo);
      }
    }

    getWorkshop();
  }, []);

  const user: IUser | null = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;
  console.log(workshop?.sparePartsAvailable, "workshoop name");

  const form = useForm({
    initialValues: {
      name: workshop?.name ?? "",
      workshopType: workshop?.workshopType ?? "",
      contactNumber: workshop?.contactNumber ?? "",
      city: workshop?.city ?? "",
      fullAddress: workshop?.fullAddress ?? "",
      selectedServices: workshop?.selectedServices ?? [],
      sparePartsAvailable: workshop?.sparePartsAvailable ?? "yes",
      serviceMode: workshop?.serviceMode ?? "workshop_only",
      workingDays: workshop?.workingDays ?? [],
      openingTime: workshop?.openingTime ?? "",
      closingTime: workshop?.closingTime ?? "",
    },
  });

  async function handleSubmit() {
    if (workshop) {
      await api.patch(`/workshops/${workshop.id}`, {
        ...form.values,
        logo: file,
        user,
      });
  

      const response = await api.get(`/workshops?userId=${user?.id}`);
      const updatedWorkshop = response.data[0];
      setWorkshop(updatedWorkshop);
  
      form.setValues({
        name: updatedWorkshop.name,
        workshopType: updatedWorkshop.workshopType,
        contactNumber: updatedWorkshop.contactNumber,
        city: updatedWorkshop.city,
        fullAddress: updatedWorkshop.fullAddress,
        selectedServices: updatedWorkshop.selectedServices,
        sparePartsAvailable: updatedWorkshop.sparePartsAvailable,
        serviceMode: updatedWorkshop.serviceMode,
        workingDays: updatedWorkshop.workingDays,
        openingTime: updatedWorkshop.openingTime,
        closingTime: updatedWorkshop.closingTime,
      });
  
      setFile(updatedWorkshop.logo);
    } else {
      const response = await api.post("/workshops", {
        ...form.values,
        logo: file,
        user,
      });

      const newWorkshop = response.data;
      setWorkshop(newWorkshop);
    }
  }
  

  async function handleUploadImage(file: any) {
    console.log(file, "file");
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData, "form data");
    const response = await api.post("/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setFile(response.data);
  }

  return (
    <Stack px={"xl"}>
      <Title>Workshop Settings</Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        {/* Basic Info */}
        <Card>
          <Flex gap={"40px"}>
            <Stack gap={"2px"}>
              <Flex
                h={60}
                w={60}
                bg={"#f4f5f7"}
                style={{ borderRadius: "12px" }}
                justify={"center"}
                align={"center"}
              >
                <IconHomeEdit />
              </Flex>
              <Text fw={700}>Basic Information</Text>
            </Stack>

            <Card>
              <Stack>
                <Flex gap={"md"}>
                  <Avatar size={"xl"} src={file.url} />
                  <Flex align={"center"}>
                    <FileInput
                      w={140}
                      placeholder={workshop?"Update Logo":"Add Logo"}
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={(file) => handleUploadImage(file)}
                    />
                  </Flex>
                </Flex>

                <TextInput
                  label="Enter Name of your workshop"
                  placeholder="e.g Saad Automotive"
                  size="sm"
                  w={250}
                  {...form.getInputProps("name")}
                />

                <Select
                  label="Workshop Type"
                  placeholder="Select Workshop Type"
                  data={[
                    { value: "bike", label: "Bike Workshop" },
                    { value: "car", label: "Car Workshop" },
                    { value: "truck", label: "Truck Workshop" },
                    { value: "bus", label: "Bus Workshop" },
                    { value: "all_vehicles", label: "All Vehicles Workshop" },
                  ]}
                  searchable
                  clearable
                  required
                  {...form.getInputProps("workshopType")}
                />

                <NumberInput
                  label="Contact Number"
                  placeholder="e.g 03000000000"
                  size="sm"
                  w={250}
                  hideControls
                  {...form.getInputProps("contactNumber")}
                />
              </Stack>
            </Card>
          </Flex>
        </Card>

        {/* Address */}
        <Card>
          <Flex gap={"110px"}>
            <Stack gap={"2px"}>
              <Flex
                h={60}
                w={60}
                bg={"#f4f5f7"}
                style={{ borderRadius: "12px" }}
                justify={"center"}
                align={"center"}
              >
                <IconLocation height="24" width="24" />
              </Flex>
              <Text fw={700}>Address</Text>
            </Stack>

            <Card>
              <Stack>
                <Select
                  data={[
                    "Multan",
                    "Lahore",
                    "Islamabad",  
                    "Karachi",
                    "Rawalpindi",
                    "Faisalabad",
                  ]}
                  label="Select City"
                  placeholder="e.g Islamabad"
                  w={250}
                  {...form.getInputProps("city")}
                />

                <TextInput
                  label="Enter Complete Address"
                  placeholder="e.g Street 5, G-11/3, Islamabad"
                  {...form.getInputProps("fullAddress")}
                />
              </Stack>
            </Card>
          </Flex>
        </Card>

        {/* Services */}
        <Card>
          <Flex gap={"100px"}>
            <Stack gap={"2px"}>
              <Flex
                h={60}
                w={60}
                bg={"#f4f5f7"}
                style={{ borderRadius: "12px" }}
                justify={"center"}
                align={"center"}
              >
                <IconBrand stroke="green" />
              </Flex>
              <Text fw={700}>Services</Text>
            </Stack>

            <Card>
              <Stack gap={"xl"}>
                <Box>
                  <Text fw={500}>Select Services</Text>
                  <Chip.Group
                    multiple
                    {...form.getInputProps("selectedServices")}
                  >
                    <Flex gap={"md"}>
                      <Chip value="engine">Engine Repair</Chip>
                      <Chip value="brakes">Brakes</Chip>
                      <Chip value="ac">AC Repair</Chip>
                      <Chip value="oil">Oil Change</Chip>
                      <Chip value="tire">Tire Change & Alignment</Chip>
                    </Flex>
                    <Flex mt={8} gap={"md"}>
                      <Chip value="battery">Battery Replacement</Chip>
                      <Chip value="bodywork">Bodywork & Painting</Chip>
                      <Chip value="roadside">
                        Emergency Roadside Assistance
                      </Chip>
                    </Flex>
                  </Chip.Group>
                </Box>

                <Box>
                  <Text fw={500}>Spare Parts Availability</Text>
                  <Radio.Group
                    required
                    {...form.getInputProps("sparePartsAvailable")}
                  >
                    <Flex gap={"xl"}>
                      <Radio value="yes" label="Yes" />
                      <Radio value="no" label="No" />
                    </Flex>
                  </Radio.Group>
                </Box>

                <Box>
                  <Text fw={500}>Service Mode</Text>
                  <Radio.Group required {...form.getInputProps("serviceMode")}>
                    <Flex gap={"xl"}>
                      <Radio value="workshop_only" label="Workshop Only" />
                      <Radio value="mobile_service" label="Mobile Service" />
                      <Radio value="both" label="Both (Workshop & Mobile)" />
                    </Flex>
                  </Radio.Group>
                </Box>
              </Stack>
            </Card>
          </Flex>
        </Card>

        {/* Schedule */}
        <Card>
          <Flex gap={"100px"}>
            <Stack gap={"2px"}>
              <Flex
                h={60}
                w={60}
                bg={"#f4f5f7"}
                style={{ borderRadius: "12px" }}
                justify={"center"}
                align={"center"}
              >
                <IconCalendar height="24" width="24" />
              </Flex>
              <Text fw={700}>Operating </Text>
              <Text fw={700}>Schedule </Text>
            </Stack>

            <Card>
              <Stack>
                <Box>
                  <Text fw={500}>Select Working Days</Text>
                  <Chip.Group multiple {...form.getInputProps("workingDays")}>
                    <Stack gap={"xs"}>
                      <Flex gap={"xl"}>
                        <Chip value="monday">Monday</Chip>
                        <Chip value="tuesday">Tuesday</Chip>
                        <Chip value="wednesday">Wednesday</Chip>
                        <Chip value="thursday">Thursday</Chip>
                      </Flex>
                      <Flex gap={"xl"}>
                        <Chip value="friday">Friday</Chip>
                        <Chip value="saturday">Saturday</Chip>
                        <Chip value="sunday">Sunday</Chip>
                      </Flex>
                    </Stack>
                  </Chip.Group>
                </Box>

                <TimeInput
                  label="Opening Time"
                  required
                  w={250}
                  {...form.getInputProps("openingTime")}
                />

                <TimeInput
                  label="Closing Time"
                  required
                  w={250}
                  {...form.getInputProps("closingTime")}
                />
              </Stack>
            </Card>
          </Flex>
        </Card>

        <Group justify="end" mt="md">
          <Button type="submit">
            {workshop ? "Update Workshop" : "List Workshop"}
          </Button>
        </Group>
      </form>
    </Stack>
  );
};

export default WorkshopSettings;
