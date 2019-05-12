export default {
  checkLogin: () => {
    if (window.localStorage.getItem('ID')) {
      return true;
    }
    return false;
  }
}