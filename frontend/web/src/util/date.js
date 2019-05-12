import moment from 'moment';

export default {
  dateToString: function(date = new Date(), format='YYYY-MM-DD HH:mm:ss'){ 
    return moment(date).format(format); 
  },
  stringToDate: function(date = ''){ 
    return moment(date).toDate(); 
  },
}