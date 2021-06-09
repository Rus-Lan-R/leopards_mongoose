const { connect, disconnect, model, SchemaType, Schema } = require('mongoose');
const People = require('./models/People.model.js');
const Cat = require('./models/Cat.model');

//https://yandex.ru/
const mongoUrl = 'mongodb://localhost:27017/leopards2021';
const atlasUrl =
  'mongodb+srv://rauf:123@cluster0.xb822.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

connect(
  mongoUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(' BASE is Connected!!!');
    main();
  }
);

const main = async () => {
  console.log('Heloo!!!!');
  try {
    const ilya = new People({ name: 'Ilya', age: 22 });
    console.log(ilya);
    const sergey = new People({ name: 'Sergey', friends: [ilya._id] });
    const shamil = new People({
      name: 'Shamil',
      age: 19,
      friends: [ilya._id, sergey._id],
    });
    ilya.friends = [sergey._id, shamil._id];
    sergey.friends.push(shamil._id);

    const kitty = new Cat({ name: 'Murzik', age: 5, owner: ilya._id });
    const kitty1 = new Cat({ name: 'Barsik1', age: 5, owner: sergey._id });
    const kitty2 = new Cat({ name: 'Barsik2', age: 5, owner: shamil._id });
    await People.deleteMany();
    await People.insertMany([ilya, sergey, shamil]);
    await Cat.deleteMany();
    await Cat.insertMany([kitty, kitty1, kitty2]);
    console.log('======FILNE PEOPLE===>');
    const peopleList = await People.find().populate({
      path: 'friends',
      populate: { path: 'friends' },
    });
    console.log(peopleList[0]);
    console.log('----');
    console.log(peopleList[0].friends[0]);
    // console.log('===Cats List ====>');
    // const catsList = await Cat.find().populate('owner');
    // console.log(catsList);
    // const katNumberOne = catsList[0];
    // const katOwner = await People.findById(katNumberOne.owner);
    // console.log(katNumberOne);
    // console.log(katOwner);
  } catch (err) {
    console.log('====ERRORR====>');
    console.log(err);
  } finally {
    disconnect();
  }
};
