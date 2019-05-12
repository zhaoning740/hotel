export default {
  checkLogin: () => {
    if (window.localStorage.getItem('ID')) {
      return true;
    }
    window.location.replace('/login');
    return false;
  }
}