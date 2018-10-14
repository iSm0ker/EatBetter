import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp 
{
  rootPage:any = HomePage;

  //// Variables bidons //////////////////////////////////////////////
  //                   

  let notWanted = [];
  notWanted.push('sardines');
  notWanted.push('saumon');
  notWanted.push('thon');

  //                                                                //
  ////////////////////////////////////////////////////////////////////                                             //

  //// Fonctions outils //////////////////////////////////////////////
  //                                                                //

  // Retourne un entier entre 0 et max-1
  function getRandomInt (max)
  {
    return Math.floor(Math.random() * Math.floor(max))
  }

  // Retourne un entier entre 0 et max-1 différent de first
  function getAnotherOne (max, first)
  {
    let second = getRandomInt (max);

    return second != first ? second : getAnotherOne (max, first)
  }

  // Retourne vrai si l'argument fait partie de la liste des VIP
  function isDoubled (n)
  {
    return (n === 'a' || n === 'b')
  }

  //                                                                //
  ////////////////////////////////////////////////////////////////////

  // Fonction retournant les aliments
  function getFoodELements ()
  {
    return {
      // x2
      a : ['broccolis', 'choux-fleurs', 'choux-kale', 'épinards', 'choux de Bruxelles', 'asperges', 'champignons', 'oignons', 'poivrons', 'ail', 'tomates', 'petits pois', 'haricots verts'],
      // x2
      b : ['poulet', 'boeuf', 'porc', 'dinde', 'oeufs', 'sardines', 'thon', 'saumon'],
      // x1
      c : ['riz', 'pâtes', 'pain'],
      // x1 - TODO : pois chiches, vraiment ?
      d : ['pommes de terre', 'carottes', 'pois chiches'],
      // x1
      e : ['pomme', 'banane', 'baies', 'pêche', 'orange'],
      // x1
      f : ['lait', 'yaourt', 'fromage'],
      // x1
      g : ['amandes', 'noix de cajou', 'cacahuètes']
    }
  }

  // Fonction permettant de retirer les aliments non désirés
  function getCleanedList (elements)
  {
    for (let n in elements)
    {
      for (let i = 0; i < elements[n].length; i++)
      {
        for (let j = 0; j < notWanted.length; j++)
        {
          if (elements[n][i] === notWanted[j])
          {
            elements[n].splice(i,1);
          }
        }
      }
    }

    return elements
  }

  // Fonction retournant les aliments pour une journée 
  function getFullDay (elements)
  {
    let day = {};

    elements = getCleanedList(elements);

    for (let n in elements)
    {
      let i = getRandomInt(elements[n].length);
      day[n+'0'] = elements[n][i];
      
      if (isDoubled(n))
      {
        let j = getAnotherOne(elements[n].length, i);
        day[n+'1'] = elements[n][j];
      }
    }

    return day
  }

  constructor (platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) 
  {
    platform.ready().then(() => 
    {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      let foodElements = getFoodELements();

      let fullDay = getFullDay(foodElements);

      for (let i in fullDay)
      {
        console.log(fullDay[i]);
      }
    });
  }
}

