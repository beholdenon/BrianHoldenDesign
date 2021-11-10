module.exports = {
  multiply: function(a, b){
    return a * b;
  },
  eq: function(a, b, options){
    return (a == b) ? options.fn(this) : options.inverse(this);
  }
}