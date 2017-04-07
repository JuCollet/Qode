'use strict';

const Qodes = require('./models/qodes.js');

Qodes.create({
  qode : "JC348",
  title: "The future of Cheeseburger",
  subtitle: "by Julien Collet",
  description: "Ennui kickstarter lyft, snackwave woke cardigan gentrify butcher gastropub iceland roof party mustache. Mumblecore master cleanse marfa shoreditch put a bird on it. Artisan bitters kombucha, pour-over brunch godard mixtape man braid jean shorts cornhole literally pabst drinking vinegar air plant kale chips.",
  cards : [{
    cardTitle: "The National University of Fast Food",
    cardText: "Ok bro, it works",
    cardReferences: [{
      text: "The National University of Fast Food",
      link: "www.fastfoodofbelgium"
    }],
    files: [{
      fileText: "The National University of Fast Food",
      filePath: "www.fastfoodofbelgium",
      fileType: "PDF",
    }],
    color: "blue"
  }],
})