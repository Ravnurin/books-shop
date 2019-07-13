import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Location } from 'history';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, makeStyles, Theme, createStyles, Container, Grid } from 'Material';

import { Book } from 'Types/Book';
import { addBookToBasket } from 'ActionCreators/basket';
import { ApplicationState } from 'Reducers/index';
import { DictionaryItem } from 'Reducers/basketReducer';

interface OwnProps {
  location: Location;
  addBookToBasket: (basket: DictionaryItem) => void;
}

type Props = OwnProps & RouteComponentProps<any> & ApplicationState;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 8),
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

function BookDetails(props: Props) {
  const { location = {} as Location, basket, match, addBookToBasket } = props;
  const [book, setBook] = useState<Book>(location.state || {} as Book);
  const classes = useStyles();

  useEffect(() => {
    if (Object.keys(book).length === 0) {
      const getBook = async () => {
        const pathName = match.params.id;
        const result = await axios.get(`https://booksontap.azurewebsites.net/api/Books/${pathName}`);
        setBook(result != null ? result.data.results : {});
      }

      getBook();
    }
  }, [book, match.params.id]);

  const handleAddBookToBasket = () => {    
    const item = basket[book.id];
    if (item) {
      const count = item.count + 1;
      const newItem = { ...item, count };
      addBookToBasket(newItem);
    } else {
      addBookToBasket({ price: book.price, title: book.title, id: book.id, count: 1 });
    }
  };

  const isAddToBasketDisabled = () => {
    const { stockAmount } = book;
    if (basket[book.id]) {
      return basket[book.id].count === stockAmount;
    }
    return false;
  };

  return Object.keys(book).length === 0 ? null : (
    <>
      <Container className={classes.cardGrid}>
        <Grid container justify="center">
          <Grid item xs={12} sm={6} md={8}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={book.thumbnail}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h6" component="h2">{book.title}</Typography>
                <Typography variant="subtitle2">By: {book.author.firstName} {book.author.lastName}</Typography>
                <br />
                <Typography variant="subtitle2">Price: {book.price}</Typography>
                <br />
                <Typography variant="subtitle2">Description</Typography>
                <Typography variant="body1">{book.description}</Typography>
                
              </CardContent>
              <CardActions className={classes.actions}>
                {book.stockAmount === 0
                ? (
                    <Typography variant="subtitle2">
                      Out of stock
                    </Typography>
                  )
                : (
                    <Button size="small" color="primary" onClick={handleAddBookToBasket} disabled={isAddToBasketDisabled()}>Add to basket</Button> 
                  )
                }
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>    
    </>
  );
}

const mapStateToProps = ({ basket }: ApplicationState) => ({ basket });

export default connect(mapStateToProps, { addBookToBasket })(BookDetails);