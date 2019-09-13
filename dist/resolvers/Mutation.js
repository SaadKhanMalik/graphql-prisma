"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _getUserID = require("../utils/getUserID");

var _getUserID2 = _interopRequireDefault(_getUserID);

var _generateToken = require("../utils/generateToken");

var _generateToken2 = _interopRequireDefault(_generateToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Mutation = {
  // 
  // actions
  // 
  login: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref, info) {
      var prisma = _ref.prisma;
      var user, isMatch;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return prisma.query.user({
                where: {
                  email: args.data.email
                }
              });

            case 2:
              user = _context.sent;

              if (user) {
                _context.next = 5;
                break;
              }

              throw new Error('Unable to login');

            case 5:
              _context.next = 7;
              return _bcryptjs2.default.compare(args.data.password, user.password);

            case 7:
              isMatch = _context.sent;

              if (isMatch) {
                _context.next = 10;
                break;
              }

              throw new Error('Unable to login');

            case 10:
              return _context.abrupt("return", {
                user: user,
                token: (0, _generateToken2.default)(user.id)
              });

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function login(_x, _x2, _x3, _x4) {
      return _ref2.apply(this, arguments);
    }

    return login;
  }(),

  // 
  // USER 
  // 
  createUser: function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, args, _ref3, info) {
      var prisma = _ref3.prisma;
      var password, user;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(args.data.password.length < 8)) {
                _context2.next = 2;
                break;
              }

              throw new Error('Password must be 8 characters or longer.');

            case 2:
              _context2.next = 4;
              return _bcryptjs2.default.hash(args.data.password, 10);

            case 4:
              password = _context2.sent;
              _context2.next = 7;
              return prisma.mutation.createUser({
                data: _extends({}, args.data, {
                  password: password
                })
              });

            case 7:
              user = _context2.sent;
              return _context2.abrupt("return", {
                user: user,
                token: (0, _generateToken2.default)(user.id)
              });

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function createUser(_x5, _x6, _x7, _x8) {
      return _ref4.apply(this, arguments);
    }

    return createUser;
  }(),
  updateUser: function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, args, _ref5, info) {
      var prisma = _ref5.prisma,
          request = _ref5.request;
      var userId;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              userId = (0, _getUserID2.default)(request);
              return _context3.abrupt("return", prisma.mutation.updateUser({
                where: {
                  id: userId
                },
                data: args.data
              }, info));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function updateUser(_x9, _x10, _x11, _x12) {
      return _ref6.apply(this, arguments);
    }

    return updateUser;
  }(),
  deleteUser: function deleteUser(parent, args, _ref7, info) {
    var prisma = _ref7.prisma,
        request = _ref7.request;

    var userId = (0, _getUserID2.default)(request);
    return prisma.mutation.deleteUser({
      where: {
        id: userId
      }
    }, info);
  },

  // 
  // Post 
  // 
  createPost: function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(parent, args, _ref8, info) {
      var prisma = _ref8.prisma,
          request = _ref8.request;
      var userId;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              userId = (0, _getUserID2.default)(request);
              return _context4.abrupt("return", prisma.mutation.createPost({
                data: {
                  title: args.data.title,
                  body: args.data.body,
                  published: args.data.published,
                  author: {
                    connect: {
                      id: userId
                    }
                  }
                }
              }, info));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function createPost(_x13, _x14, _x15, _x16) {
      return _ref9.apply(this, arguments);
    }

    return createPost;
  }(),
  updatePost: function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(parent, args, _ref10, info) {
      var prisma = _ref10.prisma,
          request = _ref10.request;
      var userId, postExists, postPublished;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              userId = (0, _getUserID2.default)(request);
              _context5.next = 3;
              return prisma.exists.Post({
                id: args.id,
                author: {
                  id: userId
                }
              });

            case 3:
              postExists = _context5.sent;
              _context5.next = 6;
              return prisma.exists.Post({
                id: args.id,
                published: true
              });

            case 6:
              postPublished = _context5.sent;

              if (postExists) {
                _context5.next = 9;
                break;
              }

              throw new Error('Unable to update post');

            case 9:
              if (!(postPublished && args.data.published === false)) {
                _context5.next = 12;
                break;
              }

              _context5.next = 12;
              return prisma.mutation.deleteManyComments({
                where: {
                  post: {
                    id: args.id
                  }
                }
              }, info);

            case 12:
              return _context5.abrupt("return", prisma.mutation.updatePost({
                where: {
                  id: args.id
                },
                data: args.data
              }, info));

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function updatePost(_x17, _x18, _x19, _x20) {
      return _ref11.apply(this, arguments);
    }

    return updatePost;
  }(),
  deletePost: function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(parent, args, _ref12, info) {
      var prisma = _ref12.prisma,
          request = _ref12.request;
      var userId, postExists;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              userId = (0, _getUserID2.default)(request);
              _context6.next = 3;
              return prisma.exists.Post({
                id: args.id,
                author: {
                  id: userId
                }
              });

            case 3:
              postExists = _context6.sent;

              if (postExists) {
                _context6.next = 6;
                break;
              }

              throw new Error('Unable to delete post');

            case 6:
              return _context6.abrupt("return", prisma.mutation.deletePost({
                where: {
                  id: args.id
                }
              }, info));

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function deletePost(_x21, _x22, _x23, _x24) {
      return _ref13.apply(this, arguments);
    }

    return deletePost;
  }(),

  // 
  // Comment 
  // 
  createComment: function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(parent, args, _ref14, info) {
      var prisma = _ref14.prisma,
          request = _ref14.request;
      var userId, postExists;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              userId = (0, _getUserID2.default)(request);
              _context7.next = 3;
              return prisma.exists.Post({ id: args.data.post, published: true });

            case 3:
              postExists = _context7.sent;

              if (postExists) {
                _context7.next = 6;
                break;
              }

              throw new Error("Unable to add comment");

            case 6:
              return _context7.abrupt("return", prisma.mutation.createComment({
                data: {
                  text: args.data.text,
                  author: {
                    connect: {
                      id: userId
                    }
                  },
                  post: {
                    connect: {
                      id: args.data.post
                    }
                  }
                }
              }, info));

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function createComment(_x25, _x26, _x27, _x28) {
      return _ref15.apply(this, arguments);
    }

    return createComment;
  }(),
  updateComment: function () {
    var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(parent, args, _ref16, info) {
      var prisma = _ref16.prisma,
          request = _ref16.request;
      var userId, commentExists;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              userId = (0, _getUserID2.default)(request);
              _context8.next = 3;
              return prisma.exists.Comment({
                id: args.id,
                author: {
                  id: userId
                }
              });

            case 3:
              commentExists = _context8.sent;

              if (commentExists) {
                _context8.next = 6;
                break;
              }

              throw new Error('Unable to delet comment');

            case 6:
              return _context8.abrupt("return", prisma.mutation.updateComment({
                where: {
                  id: userId
                },
                data: args.data
              }, info));

            case 7:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function updateComment(_x29, _x30, _x31, _x32) {
      return _ref17.apply(this, arguments);
    }

    return updateComment;
  }(),
  deleteComment: function () {
    var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(parent, args, _ref18, info) {
      var prisma = _ref18.prisma,
          request = _ref18.request;
      var userId, commentExists;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              userId = (0, _getUserID2.default)(request);
              _context9.next = 3;
              return prisma.exists.Comment({
                id: args.id,
                author: {
                  id: userId
                }
              });

            case 3:
              commentExists = _context9.sent;

              if (commentExists) {
                _context9.next = 6;
                break;
              }

              throw new Error('Unable to delet comment');

            case 6:
              return _context9.abrupt("return", prisma.mutation.deleteComment({
                where: {
                  id: userId
                }
              }, info));

            case 7:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function deleteComment(_x33, _x34, _x35, _x36) {
      return _ref19.apply(this, arguments);
    }

    return deleteComment;
  }()
};

exports.default = Mutation;