












var SearchBar = React.createClass({
  render: function() {
    return (
      <form>
        <input type="text" placeholder="Search Movie..." />
      </form>
    );
  }
});

var MOVIES = [
  {title: 'ABCD', genre: '$49.99', duration: true, rating: 'Football'},
  {title: 'EFGH', genre: '$9.99', duration: true, rating: 'Baseball'},
  {title: 'IJKL', genre: '$29.99', duration: false, rating: 'Basketball'},
  {title: 'MNOP', genre: '$99.99', duration: true, rating: 'iPod Touch'},
  {title: 'YUOP', genre: '$399.99', duration: false, rating: 'iPhone 5'},
  {title: 'YHGG', genre: '$199.99', duration: true, rating: 'Nexus 7'}
];


ReactDOM.render(
  <MovieBox movie={MOVIES} />,
  document.getElementById('content')
);
