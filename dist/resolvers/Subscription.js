"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Subscription = {
  comment: {
    subscribe: function subscribe(parent, _ref, _ref2, info) {
      var postId = _ref.postId;
      var prisma = _ref2.prisma;

      return prisma.subscription.comment(
      //    A -> 
      // null,
      // || B ->
      {
        where: {
          node: {
            post: {
              id: postId
            }
          }
        }
      }, info);
    }
  },
  post: {
    subscribe: function subscribe(parent, args, _ref3, info) {
      var prisma = _ref3.prisma;

      return prisma.subscription.post({ where: { node: { published: true } } }, info);
    }
  }
};

exports.default = Subscription;