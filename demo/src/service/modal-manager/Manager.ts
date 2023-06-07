import { EventEmitter } from "events";

const Constants = {
  CHANGE: "change",
  CLOSE: "close",
};

type TData = {
  [key: string]: any;
};

class Manager extends EventEmitter {
  modalName: string | null;
  modalData: TData;

  constructor() {
    super();
    this.modalName = null;
    this.modalData = {};
  }

  create<T>(modalName: string, modalData: T) {
    this.modalName = modalName;
    this.modalData = modalData;
    this.emitChange();
  }

  call<T>(modalName: string, data: T) {
    this.create(modalName, data);
  }

  close(...closeList: number[]) {
    this.modalName = null;
    this.modalData = {};
    this.emitClose(closeList);
  }

  emitChange() {
    this.emit(Constants.CHANGE, this.modalName, this.modalData);
  }

  emitClose(closeList?: number[]) {
    this.emit(Constants.CLOSE, closeList);
  }

  addChangeListener(listener, callback) {
    this.addListener(listener, callback);
  }

  removeChangeListener(listener, callback) {
    this.removeListener(listener, callback);
  }
}

export default new Manager();
