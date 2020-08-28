const assetSvg = {
  bottomTab: {
    WalletTab:
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M21 7C22.1046 7 23 7.89543 23 9V11H19C17.3431 11 16 12.3431 16 14C16 15.6569 17.3431 17 19 17H23V19C23 20.1046 22.1046 21 21 21H3C1.89543 21 1 20.1046 1 19V5.5C1 4.39543 1.89543 3.5 3 3.5H17C18.1046 3.5 19 4.39543 19 5.5H4.25C3.83579 5.5 3.5 5.83579 3.5 6.25C3.5 6.66421 3.83579 7 4.25 7H21ZM19 12.5C18.1716 12.5 17.5 13.1716 17.5 14C17.5 14.8284 18.1716 15.5 19 15.5H23V12.5H19Z" /></svg>',
    HomeTab:
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M5.88867 10L11.89 3.99867L17.8913 10H17.89V20H5.89001L5.89001 10H5.88867ZM3.89001 11.9987L2.4132 13.4755L1 12.0623L10.477 2.58529C11.2574 1.8049 12.5226 1.8049 13.303 2.58529L22.78 12.0623L21.3668 13.4755L19.89 11.9987V20C19.89 21.1046 18.9946 22 17.89 22H5.89001C4.78545 22 3.89001 21.1046 3.89001 20L3.89001 11.9987Z" /></svg>',
    ExploreTab:
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M14 8H10V6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10H8L8 14H6C3.79086 14 2 15.7909 2 18C2 20.2091 3.79086 22 6 22C8.20914 22 10 20.2091 10 18V16H14V18C14 20.2091 15.7909 22 18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14H16V10H18C20.2091 10 22 8.20914 22 6C22 3.79086 20.2091 2 18 2C15.7909 2 14 3.79086 14 6V8ZM10 14V10H14V14H10ZM16 16V18C16 19.1046 16.8954 20 18 20C19.1046 20 20 19.1046 20 18C20 16.8954 19.1046 16 18 16H16ZM6 16H8V18C8 19.1046 7.10457 20 6 20C4.89543 20 4 19.1046 4 18C4 16.8954 4.89543 16 6 16ZM16 8H18C19.1046 8 20 7.10457 20 6C20 4.89543 19.1046 4 18 4C16.8954 4 16 4.89543 16 6V8ZM8 6V8H6C4.89543 8 4 7.10457 4 6C4 4.89543 4.89543 4 6 4C7.10457 4 8 4.89543 8 6Z" /></svg>',
    NewPostTab:
      '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="15" fill="#E13128" stroke="#E13128" strokeWidth="2" /><path fillRule="evenodd" clipRule="evenodd" d="M14.5408 22.3337V17.4598H9.66699V14.5408H14.5408V9.66699H17.4598V14.5408H22.3337V17.4598H17.4598V22.3337H14.5408Z" fill="white" /></svg>',
  },

  postContent: {
    next:
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23Z" fill="#232323"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9.29297 8.70718L10.7072 7.29297L15.4143 12.0001L10.7072 16.7072L9.29297 15.293L12.5859 12.0001L9.29297 8.70718Z" fill="white"></path></svg>',
    prev:
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23Z" fill="#232323"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M13.7073 15.293L12.293 16.7072L7.58594 12.0001L12.293 7.29297L13.7073 8.70718L10.4144 12.0001L13.7073 15.293Z" fill="white"></path></svg>',
    piece:
      '<svg viewBox="0 0 24 21" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.9995 18.0226C7.3597 15.3883 4.76404 12.7626 3.50731 10.4739C2.22413 8.13703 2.33007 6.15457 3.05158 4.73907C4.52976 1.83909 8.73559 0.91125 11.2935 4.14634L11.9994 5.03918L12.7054 4.14639C15.2637 0.91118 19.4698 1.83915 20.9479 4.73907C21.6694 6.15455 21.7753 8.137 20.492 10.4739C19.2352 12.7626 16.6394 15.3883 11.9995 18.0226ZM11.9995 2.24518C8.51978 -1.14377 3.33709 0.215297 1.4479 3.92164C0.419411 5.93939 0.400305 8.55532 1.92953 11.3403C3.44643 14.1028 6.47793 17.0307 11.5641 19.8419L11.9994 20.0825L12.4348 19.8419C17.5211 17.0307 20.5528 14.1028 22.0698 11.3403C23.5991 8.55535 23.5801 5.93941 22.5516 3.92164C20.6624 0.215234 15.4795 -1.14373 11.9995 2.24518Z" fill="white" fill-opacity="0.87"></path></svg>',
    comment:
      '<svg viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.8194 16.6558L9.45889 13.7561H15.4905C16.3324 13.7561 17.015 13.0736 17.015 12.2317V3.08499C17.015 2.24306 16.3324 1.56055 15.4905 1.56055H3.29495C2.45302 1.56055 1.77051 2.24306 1.77051 3.08499V12.2317C1.77051 13.0736 2.45302 13.7561 3.29495 13.7561H4.8194V16.6558ZM9.02171 12.2316L6.34386 13.9053V12.2316H3.29498V3.08494H15.4905V12.2316H9.02171ZM5.58164 9.94499V8.42055H10.9172V9.94499H5.58164ZM5.58164 5.37161V6.89606H12.4416V5.37161H5.58164Z" fill="white" fill-opacity="0.87"></path></svg>',
    share:
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.79623V8.02302C5.45134 8.33141 2 11.7345 2 18V20.4142L3.70711 18.7071C5.95393 16.4603 8.69021 15.5189 12 15.8718V21.2038L22.5186 12L12 2.79623ZM14 10V7.20377L19.4814 12L14 16.7962V14.1529L13.1644 14.0136C9.74982 13.4445 6.74443 14.0145 4.20125 15.7165C4.94953 11.851 7.79936 10 13 10H14Z" fill="white"></path></svg>',
  },

  header: {
    back:
      '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30ZM16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#F2F2F2" /><path fillRule="evenodd" clipRule="evenodd" d="M14.394 9.93934C14.9798 10.5251 14.9798 11.4749 14.394 12.0607L11.6213 14.8333H24C24.8284 14.8333 25.5 15.5049 25.5 16.3333C25.5 17.1618 24.8284 17.8333 24 17.8333H11.6213L14.394 20.606C14.9798 21.1918 14.9798 22.1415 14.394 22.7273C13.8082 23.3131 12.8585 23.3131 12.2727 22.7273L6.93934 17.394C6.65804 17.1127 6.5 16.7312 6.5 16.3333C6.5 15.9355 6.65804 15.554 6.93934 15.2727L12.2727 9.93934C12.8585 9.35355 13.8082 9.35355 14.394 9.93934Z" fill="#F2F2F2" /></svg>',
    search:
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 11.8487 17.3729 13.551 16.3199 14.9056L21.7071 20.2929L20.2929 21.7071L14.9056 16.3199C13.551 17.3729 11.8487 18 10 18ZM16 10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10Z"></path></svg>',
    close:
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5C6.20101 1.5 1.5 6.20101 1.5 12C1.5 17.799 6.20101 22.5 12 22.5ZM12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F2F2F2"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11.9991 13.0607L8.77941 16.2804L7.71875 15.2197L10.9384 12.0001L7.71875 8.78039L8.77941 7.71973L11.9991 10.9394L15.2187 7.71973L16.2794 8.78039L13.0597 12.0001L16.2794 15.2197L15.2187 16.2804L11.9991 13.0607V13.0607Z" fill="white"></path></svg>',
    check:
      '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30ZM16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#E13128"></path><circle cx="16" cy="16" r="16" fill="#E13128"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M13.7061 19.2929L22.999 10L24.4132 11.4142L13.7061 22.1213L7.99902 16.4142L9.41324 15L13.7061 19.2929Z" fill="white"></path></svg>',
  },

  wallet: {
    pac:
      '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30ZM16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="white"></path><path d="M12.25 18.3828V25.0625H10V8H16.293C18.1602 8 19.6211 8.47656 20.6758 9.42969C21.7383 10.3828 22.2695 11.6445 22.2695 13.2148C22.2695 14.8711 21.75 16.1484 20.7109 17.0469C19.6797 17.9375 18.1992 18.3828 16.2695 18.3828H12.25ZM12.25 16.543H16.293C17.4961 16.543 18.418 16.2617 19.0586 15.6992C19.6992 15.1289 20.0195 14.3086 20.0195 13.2383C20.0195 12.2227 19.6992 11.4102 19.0586 10.8008C18.418 10.1914 17.5391 9.875 16.4219 9.85156H12.25V16.543Z" fill="white"></path></svg>',
  },

  common: {
    more:
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 12C20 13.1046 19.1046 14 18 14C16.8954 14 16 13.1046 16 12C16 10.8954 16.8954 10 18 10C19.1046 10 20 10.8954 20 12Z" fill="#E2E2E2"></path><path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="#E2E2E2"></path><path d="M8 12C8 13.1046 7.10457 14 6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12Z" fill="#E2E2E2"></path></svg>',
  },
};

export default assetSvg;
