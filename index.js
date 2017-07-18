var Users = React.createClass({
  getInitialState: function(){
    return {last30Days: [], allTime: [], current: [], currentValue: 0};
  },
  componentDidMount: function() {
    $.get(this.props.sourceLast30Days, function(result) {
      if (this.isMounted()) {
        this.setState({
          last30Days: result,
          current: result,
          currentValue: 0
        });
      }
    }.bind(this));
    $.get(this.props.sourceAllTime, function(result) {
      if (this.isMounted()) {
        this.setState({
          allTime: result
        });
      }
    }.bind(this));
  },
  setCurrentLast30Days: function(){
    this.setState({current: this.state.last30Days, currentValue: 0});
  },
  setCurrentAllTime: function(){
    this.setState({current: this.state.allTime, currentValue: 1});
  },
  getUsers: function(obj, idx){
    return  <tr>
      <td>
        <div class="ui ribbon label">{idx + 1}</div>
      </td>
      <td><img className="ui mini spaced image" src={obj.img} />{obj.username}</td>
      <td>{obj.recent}</td>
      <td>{obj.alltime}</td>
    </tr>;
  },
  render: function(){
    var last30Current = classNames({
      "icon toggle down": (this.state.currentValue == 0)
    });
    var allTimeCurrent = classNames({
      "icon toggle down": (this.state.currentValue == 1)
    });
    return <table className="ui celled unstackable table">
  <thead>
    <tr><th>#</th>
    <th>Camper Name</th>
    <th><a href="#" onClick={this.setCurrentLast30Days}>Points in last 30 days <i className={last30Current} /></a></th>
    <th><a href="#" onClick={this.setCurrentAllTime}>All time Points <i className={allTimeCurrent} /></a></th>
  </tr></thead>
    <tbody>
      {this.state.current.map(this.getUsers)}
    </tbody>
    </table>;
  }
});

ReactDOM.render(<Users sourceLast30Days="https://fcctop100.herokuapp.com/api/fccusers/top/recent" sourceAllTime="https://fcctop100.herokuapp.com/api/fccusers/top/alltime" />, document.getElementById('app'));


