import { Group, SegmentedControl, Stack, Title } from "@mantine/core";
import { useMemo, useState } from "react";
import MyCompletedBookings from "./customerCompletedBookings";
import MyCancelledBookings from "./customer-cancelledBookings";


const BookingsOverview = () => {
  const [selectedValue, setSelectedValue] = useState("upcoming");

  const [titleToRender, statusComponent] = useMemo(() => {
    if (selectedValue === "upcoming")
      return ["Upcoming Bookings", <MyCompletedBookings/>];
    if (selectedValue === "completed")
      return ["Completed Bookings", <MyCompletedBookings />];

    return ["Cancelled Bookings", <MyCancelledBookings />];
  }, [selectedValue]);

  return (
    <>
      <Stack>
        <Group justify="space-between">
          <Title>{titleToRender}</Title>
          <SegmentedControl
            value={selectedValue}
            onChange={setSelectedValue}
            data={[
              { label: "Upcoming Bookings", value: "upcoming" },
              { label: "Completed Bookings", value: "completed" },
              { label: "Cancelled Bookings", value: "cancelled" },
            ]}
            color={"green"}
            transitionDuration={600}
            transitionTimingFunction="linear"
          />
        </Group>

        {statusComponent}
      </Stack>
    </>
  );
};
export default BookingsOverview;
