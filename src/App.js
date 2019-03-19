import React, { Component } from 'react';
import mtg from './mtg.jpg';
import doge from './doge.jpeg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        	<img id="image" src={mtg} alt="Approach of the Second Sun" position="relative" width="1200" height="430"/>
        	<p>Em busca de cartinhas bem baratas?</p>
        	<form id="myformmbb" action="https://www.magicbembarato.com.br/">
    			<input type="submit" value="Magic Bem Barato"/>
			</form>
			<form id="myformkinoene" action="https://www.kinoenecards.com.br/">
    			<input type="submit" value="Kinoene"/>
			</form>
			<form id="myformcop" action="https://www.cardsofparadise.com.br/">
    			<input type="submit" value="Cards of Paradise"/>
			</form>
        </header>
      </div>
    );
  }
}

export default App;
