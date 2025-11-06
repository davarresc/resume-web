export interface SharedWorkerGlobalScope extends WorkerGlobalScope {
  onconnect: (e: MessageEvent) => void;
  __sharedWorker?: SharedWorker;
}
