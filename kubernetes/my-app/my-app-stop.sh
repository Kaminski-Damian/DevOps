#!/bin/bash
kubectl delete ingress my-app-ingress;

kubectl delete deploy my-frontend-deployment my-backend-deployment my-postgres-deployment my-redis-deployment;

kubectl delete svc my-frontend-cluster-ip-service my-backend-cluster-ip-service my-postgres-cluster-ip-service my-redis-cluster-ip-service;

kubectl delete cm my-backend-configmap my-postgres-configmap my-redis-configmap;

kubectl delete secret my-postgres-secret;

kubectl delete pvc my-postgres-pvc;

kubectl delete pv my-app-pv;