#!/bin/bash
kubectl apply -f my-redis/my-redis-configMap.yaml;
kubectl apply -f my-redis/my-redis-deployment.yaml;
kubectl apply -f my-redis/my-redis-cluster-ip-service.yaml;

kubectl apply -f my-app-pv.yaml;

kubectl apply -f my-postgres/my-postgres-secret.yaml;
kubectl apply -f my-postgres/my-postgres-configMap.yaml;
kubectl apply -f my-postgres/my-postgres-pvc.yaml;
kubectl apply -f my-postgres/my-postgres-deployment.yaml;
kubectl apply -f my-postgres/my-postgres-cluster-ip-service.yaml;

kubectl apply -f my-backend/my-backend-configMap.yaml;
kubectl apply -f my-backend/my-backend-deployment.yaml;
kubectl apply -f my-backend/my-backend-cluster-ip-service.yaml;

kubectl apply -f my-frontend/my-frontend-deployment.yaml;
kubectl apply -f my-frontend/my-frontend-cluster-ip-service.yaml;

kubectl apply -f my-app-ingress.yaml;