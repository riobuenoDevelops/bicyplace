const AdminRole = {
  controllers: {
    "*": {
      actions: {
        "*": true,
      },
    },
  },
};

const SellerRole = {
  controllers: {
    user: {
      actions: {
        getUser: true,
        updateUser: true,
        deleteUser: true,
      },
    },
    index: {
      actions: {
        "*": true,
      },
    },
    document: {
      actions: {
        "*": true,
      },
    },
    collection: {
      actions: {
        "*": true,
      },
    },
  },
};

const CustomerRole = {
  controllers: {
    "*": {
      actions: {
        "*": true,
      },
    },
  },
};

export { AdminRole, SellerRole, CustomerRole };
