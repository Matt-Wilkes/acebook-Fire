import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const UserCard = ({ image, firstName, lastName, button1Text }) => {


  return (
    <Card sx={{ maxWidth: 380 }} style={{ margin: "2em",  overflow: 'hidden' }}>
      {image && ( // Conditionally render image if provided
        <CardMedia
          sx={{ height: 265, width: 265 }}
          image={image}
        />
      )}

      <CardContent>
        {/* <Typography gutterBottom variant="h5" component="div">
          {firstName}
        </Typography> */}
        <h3>{firstName} {lastName}</h3>

        {/* <Typography variant="body1" color="text.secondary">
          {firstName}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          {lastName}
        </Typography> */}

        <Typography variant="body1" color="text.secondary">
          {/* {email} */}
        </Typography>

      </CardContent>

      <CardActions>
        <button style={{ color: "blue" }} size="small">{button1Text}</button>
        {/* <Button>
          {button3Text}
        </Button>
        <Button>
          {button2Text}
        </Button> */}
      </CardActions>

    </Card>
  );
};

export default UserCard;
