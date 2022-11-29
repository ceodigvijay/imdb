import nextConnect from "next-connect";
import middleware from "../../middlewares/middleware";
import mongodb, { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

const deleteFav = async (req) => {
  const ip = "192.168.0.1";
  const movieId = req.body.movie_id;
  return await req.db
    .collection("favourites")
    .deleteOne({ user_ip: ip, movie_id: new ObjectId(movieId) })
    .then(() => {
      return { status: "success" };
    })
    .catch((error) => {
      return Promise.reject({ status: error.toString() });
    });
};

const addFavourite = async (req) => {
  try {
    const ip = req.socket.localAddress;
    const movieId = req.body.movie_id;
    const data = await req.db.collection("favourites").findOne({
      user_ip: ip,
      movie_id: new ObjectId(movieId),
    });
    if (data) {
      return { status: 0 };
    } else {
      await req.db.collection("favourites").insertOne({
        user_ip: ip,
        movie_id: new ObjectId(movieId),
      });
      return { status: 1 };
    }
  } catch (error) {
    return Promise.reject({ status: error.toString() });
  }
};

handler.delete((req, res) => {
  return deleteFav(req)
    .then((data) => {
      return res.status(204).send();
    })
    .catch((error) => {
      return Promise.reject(
        res.status(200).send({
          status: error.toString(),
        })
      );
    });
});

handler.put((req, res) => {
  return addFavourite(req)
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((error) => {
      return Promise.reject(
        res.status(200).send({
          status: error.toString(),
        })
      );
    });
});

export default handler;
