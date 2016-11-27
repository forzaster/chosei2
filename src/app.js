var React = require('react');
var ReactDOM = require('react-dom');
var request = require('superagent');
var config = require('./config');
var dates = ["1206", "1207", "1208"];
var tableStyle = {
          "border": "3px solid black"
};

var TableComp = React.createClass({
  getInitialState:function(){
    return {json_data:[], users:[],
            table_data: []};
  },
  getData:function(name, mail) {
    var url = config();
    request
      .get(url)
      .query({})
      .end(function(err, res){
        if (err) {
          alert(res.text);
        }
        var map = JSON.parse(res.text);
        var usrs = [];
        var i = 0;
        var values = [];
        var tdata = [];
        console.log(res.text);
        for (key in map) {
            var tdata_i = 0;
            var tdata_one = []
            usrs[i] = key;
            values[i] = map[key];
            tdata_one[tdata_i++] = key;
            console.log(key);
            for (var j = 0; j < dates.length; j++) {
                var d = dates[j];
                var v = values[i][d];
                console.log(d);
                console.log(v);
                if (v == 0) {
                    tdata_one[tdata_i++] = "x";
                } else if (v == 1) {
                    tdata_one[tdata_i++] = "△";
                } else if (v == 2) {
                    tdata_one[tdata_i++] = "○";
                }
            }
            tdata[i] = tdata_one;
            i += 1;
        }
        this.setState({json_data: res.text, users: usrs, table_data: tdata});
      }.bind(this));
  },
  componentDidMount:function(){
    this.getData();
  },
  render:function(){
      return (
          <div>
          <h1>調整</h1>
          <table style={tableStyle}>
          <thead>
          <tr>
          <td></td>
          {dates.map(function(d) {
              return (
                      <td key={d}>{d}</td>
              );
          })}
          </tr>
          </thead>
          <tbody>
              {this.state.table_data.map(function(row, index) {
                  return (
                      <tr key={'row' + index}>
                              {row.map(function(ele) {
                                          return (<td key={ele}>{ele}</td>);
                                      })
                              }
                      </tr>
              );
          })}
          </tbody>
          </table>
          </div>
      );
  }
});

var RegisterComp = React.createClass({
  getInitialState:function(){
      return {isWrite: false};
  },
  componentDidMount:function(){
  },
  onClickRegister:function(e) {
      this.setState({isWrite: true});
  },
  onClickDone:function(e) {
  },
  render:function(){
      if (this.state.isWrite) {
          return (
          <div>
          <table style={tableStyle}>
          <tbody>
          {dates.map(function(d) {
              return (
                  <tr key={"reg" + d}>
                  <td key={d}>{d}</td>
                  <td>
                  <input type="radio" name={d} value="2">◯</input>
                  <input type="radio" name={d} value="1">△</input>
                  <input type="radio" name={d} value="0">x</input>
                  </td>
                  </tr>
              );
          })}
          </tbody>
          </table>
          <button onClick={this.onClickDone}>OK</button>
          </div>
          );
      } else {
          return (
              <div>
              <button onClick={this.onClickRegister}>登録</button>
              </div>
          );
      }
  }
});

ReactDOM.render(
  <TableComp />,
  document.getElementById('table_area')
);
ReactDOM.render(
  <RegisterComp />,
  document.getElementById('register_area')
);
