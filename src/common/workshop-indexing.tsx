import { Avatar, Badge, Button, Card, Flex, Group, Select, Stack, TextInput, Title,Text } from "@mantine/core";
import IconEye from "../assets/IconEye";
import IconLocation from "../assets/IconLocation";
import IconPhone from "../assets/IconPhone";

export default function WorkshopIndexing() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu",  "Sat"];
  const services = [
    "Engine Repair",
    "Brakes",
    "AC Repair",
    "Oil Change",
    "Tire Change & Alignment",
    "Battery Replacement",
    "Bodywork & Painting",
    "Emergency Roadside Assistance",
  ];
  return (
    <>
      <Group justify="flex-end" mt={20} mr={20}>
      <TextInput placeholder='Search by Name'/>

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
         
        />
        <TextInput placeholder='Search by Area'/>
      </Group>
         <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            w={350}
            mt={40}
            ml={40}
          >
            <Card.Section withBorder>
              <Flex h={150} align={"center"} px={"sm"} gap={"xl"}>
                <Avatar size={"xl"} />
                <Stack h={"100%"} py={"xs"}>
                  <Title
                    order={4}
                    c={"#40c057ff"}
                    style={{
                      fontFamily: "cursive",
                    }}
                  >
                    John Automotive
                  </Title>
                  <Stack gap={2}>
                    <Group gap={"xs"}>
                      <IconEye />
                      <Text c={"dimmed"}>Car</Text>
                    </Group>
                    <Group gap={"xs"}>
                      <IconLocation height="20" width="20" />
                      <Text c={"dimmed"}>Multan</Text>
                    </Group>
                    <Group gap={"xs"}>
                      <IconPhone height="18" width="18" />
                      <Text c={"dimmed"}>03000000000</Text>
                    </Group>
                  </Stack>
                </Stack>
              </Flex>
            </Card.Section>
            <Stack>
              <Group justify="end">
                <Badge color="green" variant="light" mt="sm" size="sm">
                  Available
                </Badge>
              </Group>
              <Group justify="space-between">
                <Text>Timings</Text>
                <Text c={"dimmed"}>9:00 Am to 6:00 Pm</Text>
              </Group>
              <Group justify="space-between">
                <Text> Days</Text>
                <Flex gap={2}>
                {days.map((day) => (
                  <Badge key={day} color="green" variant="light" size="xs">
                    {day}
                  </Badge>
                ))}
                </Flex>
                
              </Group>
              
                <Text>Services :</Text>
                <Group>
                {services.map((service) => (
                  <Badge key={service} color="green" variant="light" size="sm">
                    {service}
                  </Badge>
                ))}
                </Group>
                
           
            </Stack>
      
            <Button fullWidth mt="md" color="teal">
              Book Now
            </Button>
          </Card>
          </>
 
  );
}
