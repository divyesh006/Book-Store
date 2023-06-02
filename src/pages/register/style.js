import { makeStyles } from "@material-ui/core/styles";
import { colors } from "../../constant/constant";

const createAccountStyle = makeStyles((theme) => ({
  createAccountWrapper: {
    "& .create-account-page-wrapper": {
      padding: "42px 0 80px",
      "@media (max-width: 991px)": {
        padding: "35px 0 50px",
      },
      "@media (max-width: 767px)": {
        padding: "35px 0 40px",
      },
      "& .create-account-row": {
        "& .personal-information": {
          marginBottom: "32px",
          padding : "38px"
        },
        "& .login-information": {
          marginBottom: "32px",
          padding : "38px",
          paddingTop : "2px"
        },
        "& p": {
          color: colors.lightTextColor,
          fontWeight: 300,
          fontSize: "15px",
          marginBottom: "16px",
        },
        "& .backlink": {
          color: colors.primary,
          fontWeight: "300",
        },

        "& .btn-wrapper": {
          marginBottom: "15px",
          marginTop: "17px",
          "& .btn": {
            borderRadius: "20px",
            minWidth: "136px",
            padding: "0 15px",
          },
        },
        "& .form-row-wrapper": {
          display: "flex",
          flexWrap: "wrap",
          margin: "0 -15px",
          "& .form-col": {
            padding: " 0 15px",
            maxWidth: "50%",
            flex: "0 0 50%",
            position: "relative",
            "@media(max-width:767px)": {
              maxWidth: "100%",
              flex: "0 0 100%",
            },
            "&.full-width": {
              maxWidth: "100%",
              flex: "0 0 100%",
            },
            "& p": {
              color: colors.lightTextColor,
              fontWeight: 300,
              fontSize: "15px",
              marginBottom: "16px",
              "&.text-danger": {
                fontSize: "14px",
                color: colors.primary,
                position: "relative",
                bottom: "12%",
                margin: "0",
              },
            },
          },
          "& .MuiInputBase-formControl": {
            marginBottom: "15px",
          },
          
        },
        background: "rgba(255, 255, 255, 0.1)",
          boxShadow: "4px 4px 10px 4px rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(20px)",
          borderRadius: "15px",
          perspective: "1000px",
          transformStyle: "preserve-3d",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "6px 6px 20px 6px rgba(0, 0, 0, 0.8)",
          },
      },
      
    },
  },
}));

export { createAccountStyle };
