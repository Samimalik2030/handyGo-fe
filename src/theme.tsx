import { createTheme } from "@mantine/core";

const theme = createTheme({
  fontFamily: "Inter, sans-serif",
  components: {
    Button: {
      defaultProps: {
        size: "sm",
        radius: "md",
        color:"#40c057ff"
      },
    },
    Card: {
      defaultProps: {
        radius: "lg",
        padding: "lg",
      },
    },

    TextInput: {
      defaultProps: {
        size: "sm",
        radius: "md",
      },
    },
    FileInput: {
      defaultProps: {
        radius: "md",
      },
    },
    NumberInput: {
      defaultProps: {
        size: "sm",
        radius: "md",
      },
    },
    Input: {
      defaultProps: {
        size: "sm",
        radius: "md",
      },
    },
    Select: {
      defaultProps: {
        size: "sm",
        radius: "md",
        allowDeselect: true,
      },
    },
    MultiSelect: {
      defaultProps: {
        size: "sm",
        radius: "md",
      },
    },
    Checkbox: {
      defaultProps: {
        size: "md",
        radius: "md",
      },
    },
    PasswordInput: {
      defaultProps: {
        size: "sm",
        radius: "md",
      },
    },
    Anchor: {
      defaultProps: {
        c: "#2A8C82",
      },
    },
    Chip: {
      defaultProps: {
        color: "#40c057ff",
      },
    },
    Radio: {
      defaultProps: {
        color: "#40c057ff",
      },
    },
  },
});
export default theme;
