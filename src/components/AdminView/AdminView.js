import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  list: {
    alignItems: "center",
    marginTop: theme.spacing(8),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    flexGrow: 1,
  },
  rootToolbar: {
    flexGrow: 1,
  },
}));

const AdminView = ({ playersInRoom, socket, activePlayer }) => {
  const classes = useStyles();

  const playersNoAdmin = playersInRoom.filter((player) => !player.isAdmin);
  const admin = playersInRoom.find((player) => player.isAdmin);

  const playersList = () =>
    playersNoAdmin.map((player) => (
      <>
        <ListItem>
          <ListItemIcon>
            <EmojiPeopleIcon />
          </ListItemIcon>
          <ListItemText primary={player.name} />
        </ListItem>{" "}
        <Divider />
      </>
    ));

  const handlePlaySound = (e) => {
    const type = e.currentTarget.id;
    socket.emit("sound", activePlayer, `/${type}.wav`);
  };

  return (
    <>
      <div className={classes.rootToolbar}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Welcome {admin.name}!
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} sm={6} component={Paper}>
          <Container component="main" maxWidth="xs" className={classes.list}>
          <Typography variant="h6" className={classes.title}>
              People in the room {admin.room}:
            </Typography>
            <List>{playersList()}</List>
          </Container>
        </Grid>
        <Grid item xs={12} sm={6} component={Paper} elevation={6} square>
          <Container component="main" maxWidth="xs" className={classes.list}>
            <List>
              <ListItem button id="dobra-odpowiedz" onClick={handlePlaySound}>
                <ListItemIcon>
                  <VolumeUpIcon />
                </ListItemIcon>
                <ListItemText primary="Correct answer" />
              </ListItem>
              <ListItem button id="zla-odpowiedz" onClick={handlePlaySound}>
                <ListItemIcon>
                  <VolumeUpIcon />
                </ListItemIcon>
                <ListItemText primary="Wrong answer" />
              </ListItem>
              <ListItem button id="nastepna-runda" onClick={handlePlaySound}>
                <ListItemIcon>
                  <VolumeUpIcon />
                </ListItemIcon>
                <ListItemText primary="Next round" />
              </ListItem>
              <ListItem
                button
                id="zegnaj-z-teleturnieju"
                onClick={handlePlaySound}
              >
                <ListItemIcon>
                  <VolumeUpIcon />
                </ListItemIcon>
                <ListItemText primary="Eliminate player" />
              </ListItem>
            </List>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminView;
