import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";

import Typography from "@mui/material/Typography";



export const Comment = (props) => {

  const formatDate = (date) => {
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    return new Date(date).toLocaleString("en-GB", options).replace(",", "");
  };

  return (
    <Card
      key={props.id}
      sx={{
        width: "95%",
        margin: "0 auto",
        padding: "0.1em",
        mt: 3,
      }}
      elevation={2}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: "#fbac3f", display: "flex" }}
            alt="Matt"
            src="/broken-image.jpg"
          ></Avatar>
        }
        title={`${props.firstName} ${props.lastName}`}
        style={{ textAlign: "left" }}
        subheader={`${formatDate(props.date)}`}
      />
      <CardContent sx={{ display: "flex" }}>
        <Typography variant="body2" color="text.secondary">
          {props.message}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "right", mr: 1.3 }}>
      </CardActions>
    </Card>
  );
};

export default Comment;
