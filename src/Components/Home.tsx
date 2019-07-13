import React, { useEffect } from 'react';
import { push, Push } from 'connected-react-router';
import { connect } from 'react-redux';
import { makeStyles, Theme, createStyles, Container, Grid, Typography, Button, Card, CardMedia, CardContent, CardActions } from 'Material';

import { ApplicationState } from 'Reducers';
import { Book } from 'Types/Book';
import * as Actions from 'ActionCreators/home';

interface OwnProps {
  getBooks: () => void;
  push: Push;
}

type Props = OwnProps & ApplicationState;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
      textAlign: 'center'
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
    actions: {
      justifyContent: "center"
    }
  })
);

function Home(props: Props) {
  const { books, getBooks } = props;
  const classes = useStyles();  

  const navigateToBookPage = (book: Book) => {
    props.push(`/book/${book.id}`, book);
  };

  useEffect(() => {
    if (books == null || books.length === 0) {
      getBooks();
    }
  }, [books, getBooks]);

  return (
    <>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container justify="center">
              {books.map(book => (
                <Grid item key={`${book.id}-${book.author}`} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={book.thumbnail}
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h6" component="h2">{book.title}</Typography>
                      <Typography variant="subtitle1">By: {book.author.firstName} {book.author.lastName}</Typography>
                      <br />
                      <Typography variant="subtitle2">Price: £{book.price}</Typography>
                      <Typography variant="subtitle2">Left in stock: {book.stockAmount}</Typography>
                    </CardContent>
                    <CardActions className={classes.actions}>
                      <Button size="medium" color="primary" onClick={() => navigateToBookPage(book)}>See more</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
      </main>
    </>
  );
}

const mapStateToProps = ({ books }: ApplicationState) => ({ books });

export default connect(mapStateToProps, { ...Actions, push })(Home);
