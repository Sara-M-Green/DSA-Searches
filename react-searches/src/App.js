import React from 'react'
import dataSet from './dataset'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchType: "",
      searches: 0,
      searchNum: null,
      error: null,
      message: null
    }
    
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.state.searchType === "linear") {
      this.linearSearch(dataSet, this.state.searchNum)

    } else if (this.state.searchType === "binary") {
      this.binarySearch(dataSet, this.state.searchNum, 0, 99)
    }
    return
    
  }

  handleSelect(e) {
    this.setState({
      searchType: e.target.value
    })
  }

  handleSearchNum(e) {
    e.preventDefault()
    this.setState({
      searchNum: e.target.value
    })
  }

  linearSearch(array, value) {
    let ticks = 0
    for (let i = 0; i < array.length; i++) {
      ticks +=1
      if (array[i] == value) {
        this.setState({
          searches: ticks,
          message: 'Refresh page to search again'
        })
        return i
      }
    }
    this.setState({
      error: "Search value not found in dataset, please try again"
    })
  }

  binarySearch(arr, value, start, end, ticks = 0) {

    function compareNumbers(a, b) {
      return a - b
    }

    let array = arr.sort(compareNumbers)
    console.log(array)
    console.log(ticks)
    
    

    if (start > end) {
      ticks += 1
      this.setState({
        error: 'Invalid data set',
        searches: ticks
      })
        return -1;
    }

    const index = Math.floor((start + end) / 2);
    const item = array[index];

    console.log(start, end);
    if (item == value) {
        ticks += 1
        this.setState({
          searches: ticks,
          message: 'Refresh page to search again'
        })
        return index

    }
    else if (item < value) {
        ticks += 1
        this.setState({
          searches: ticks
        })
        return this.binarySearch(array, value, index + 1, end, ticks);
    }
    else if (item > value) {
        ticks += 1
        this.setState({
          searches: ticks
        })
        return this.binarySearch(array, value, start, index - 1, ticks);
    }
    this.setState({
      error: 'Search value not found in data set'
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Search Algorithm Practice!</h1>
          
          <select value={this.state.value} onChange={(e) => this.handleSelect(e)}>
            <option value="">Select Search Type</option>
            <option value="linear">Linear</option>
            <option value="binary">Binary</option>

          </select>

          <p>
            Search Value:
          </p>
          <form onSubmit={(e) => this.handleSubmit(e)}>
          <input onChange={(e) => this.handleSearchNum(e)} className="input" type="text" />
          <input 
            className="submit" 
            type="submit" 
          />
          </form>
        </header>
        <main className="results">
          <h1>Results:</h1>
          <p>Number of Searches: {this.state.searches}</p>
          <p>{this.state.error}</p>
          <p>{this.state.message}</p>
        </main>
      </div>
    ); 
  }
  
}

export default App;
