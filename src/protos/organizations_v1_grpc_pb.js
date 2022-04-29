// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2015 gRPC authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';
var grpc = require('grpc');
var organizations_v1_pb = require('./organizations_v1_pb.js');

function serialize_organizations_v1_OrgIdRequest(arg) {
  if (!(arg instanceof organizations_v1_pb.OrgIdRequest)) {
    throw new Error('Expected argument of type organizations_v1.OrgIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_organizations_v1_OrgIdRequest(buffer_arg) {
  return organizations_v1_pb.OrgIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_organizations_v1_OrganizationCodeReply(arg) {
  if (!(arg instanceof organizations_v1_pb.OrganizationCodeReply)) {
    throw new Error('Expected argument of type organizations_v1.OrganizationCodeReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_organizations_v1_OrganizationCodeReply(buffer_arg) {
  return organizations_v1_pb.OrganizationCodeReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_organizations_v1_OrganizationCodeRequest(arg) {
  if (!(arg instanceof organizations_v1_pb.OrganizationCodeRequest)) {
    throw new Error('Expected argument of type organizations_v1.OrganizationCodeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_organizations_v1_OrganizationCodeRequest(buffer_arg) {
  return organizations_v1_pb.OrganizationCodeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_organizations_v1_OrganizationObjectReply(arg) {
  if (!(arg instanceof organizations_v1_pb.OrganizationObjectReply)) {
    throw new Error('Expected argument of type organizations_v1.OrganizationObjectReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_organizations_v1_OrganizationObjectReply(buffer_arg) {
  return organizations_v1_pb.OrganizationObjectReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_organizations_v1_OrganizationObjectRequest(arg) {
  if (!(arg instanceof organizations_v1_pb.OrganizationObjectRequest)) {
    throw new Error('Expected argument of type organizations_v1.OrganizationObjectRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_organizations_v1_OrganizationObjectRequest(buffer_arg) {
  return organizations_v1_pb.OrganizationObjectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_organizations_v1_OrganizationPageReply(arg) {
  if (!(arg instanceof organizations_v1_pb.OrganizationPageReply)) {
    throw new Error('Expected argument of type organizations_v1.OrganizationPageReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_organizations_v1_OrganizationPageReply(buffer_arg) {
  return organizations_v1_pb.OrganizationPageReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_organizations_v1_OrganizationPageRequest(arg) {
  if (!(arg instanceof organizations_v1_pb.OrganizationPageRequest)) {
    throw new Error('Expected argument of type organizations_v1.OrganizationPageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_organizations_v1_OrganizationPageRequest(buffer_arg) {
  return organizations_v1_pb.OrganizationPageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The organizations service definition.
var OrganizationsService = exports.OrganizationsService = {
  get_organizations: {
    path: '/organizations_v1.Organizations/get_organizations',
    requestStream: false,
    responseStream: false,
    requestType: organizations_v1_pb.OrganizationPageRequest,
    responseType: organizations_v1_pb.OrganizationPageReply,
    requestSerialize: serialize_organizations_v1_OrganizationPageRequest,
    requestDeserialize: deserialize_organizations_v1_OrganizationPageRequest,
    responseSerialize: serialize_organizations_v1_OrganizationPageReply,
    responseDeserialize: deserialize_organizations_v1_OrganizationPageReply,
  },
  get_organization_by_id: {
    path: '/organizations_v1.Organizations/get_organization_by_id',
    requestStream: false,
    responseStream: false,
    requestType: organizations_v1_pb.OrgIdRequest,
    responseType: organizations_v1_pb.OrganizationObjectReply,
    requestSerialize: serialize_organizations_v1_OrgIdRequest,
    requestDeserialize: deserialize_organizations_v1_OrgIdRequest,
    responseSerialize: serialize_organizations_v1_OrganizationObjectReply,
    responseDeserialize: deserialize_organizations_v1_OrganizationObjectReply,
  },
  get_organization_by_code: {
    path: '/organizations_v1.Organizations/get_organization_by_code',
    requestStream: false,
    responseStream: false,
    requestType: organizations_v1_pb.OrganizationCodeRequest,
    responseType: organizations_v1_pb.OrganizationObjectReply,
    requestSerialize: serialize_organizations_v1_OrganizationCodeRequest,
    requestDeserialize: deserialize_organizations_v1_OrganizationCodeRequest,
    responseSerialize: serialize_organizations_v1_OrganizationObjectReply,
    responseDeserialize: deserialize_organizations_v1_OrganizationObjectReply,
  },
  generate_code: {
    path: '/organizations_v1.Organizations/generate_code',
    requestStream: false,
    responseStream: false,
    requestType: organizations_v1_pb.OrgIdRequest,
    responseType: organizations_v1_pb.OrganizationCodeReply,
    requestSerialize: serialize_organizations_v1_OrgIdRequest,
    requestDeserialize: deserialize_organizations_v1_OrgIdRequest,
    responseSerialize: serialize_organizations_v1_OrganizationCodeReply,
    responseDeserialize: deserialize_organizations_v1_OrganizationCodeReply,
  },
  create_organization: {
    path: '/organizations_v1.Organizations/create_organization',
    requestStream: false,
    responseStream: false,
    requestType: organizations_v1_pb.OrganizationObjectRequest,
    responseType: organizations_v1_pb.OrganizationObjectReply,
    requestSerialize: serialize_organizations_v1_OrganizationObjectRequest,
    requestDeserialize: deserialize_organizations_v1_OrganizationObjectRequest,
    responseSerialize: serialize_organizations_v1_OrganizationObjectReply,
    responseDeserialize: deserialize_organizations_v1_OrganizationObjectReply,
  },
  update_organization: {
    path: '/organizations_v1.Organizations/update_organization',
    requestStream: false,
    responseStream: false,
    requestType: organizations_v1_pb.OrganizationObjectRequest,
    responseType: organizations_v1_pb.OrganizationObjectReply,
    requestSerialize: serialize_organizations_v1_OrganizationObjectRequest,
    requestDeserialize: deserialize_organizations_v1_OrganizationObjectRequest,
    responseSerialize: serialize_organizations_v1_OrganizationObjectReply,
    responseDeserialize: deserialize_organizations_v1_OrganizationObjectReply,
  },
  delete_organization_by_id: {
    path: '/organizations_v1.Organizations/delete_organization_by_id',
    requestStream: false,
    responseStream: false,
    requestType: organizations_v1_pb.OrgIdRequest,
    responseType: organizations_v1_pb.OrganizationObjectReply,
    requestSerialize: serialize_organizations_v1_OrgIdRequest,
    requestDeserialize: deserialize_organizations_v1_OrgIdRequest,
    responseSerialize: serialize_organizations_v1_OrganizationObjectReply,
    responseDeserialize: deserialize_organizations_v1_OrganizationObjectReply,
  },
};

exports.OrganizationsClient = grpc.makeGenericClientConstructor(OrganizationsService);
