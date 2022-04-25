import React, {Component} from 'react';  
import $ from 'jquery';  
import axios from 'axios';  
  
class Pegawai extends Component {  
  
    constructor() {  
        super();  
        this.state = {  
          pegawai: [], // array pegawai untuk menampung data pegawai  
          nip: "",  
          nama: "",  
          alamat: "",  
          action: "",  
          search: "",  
        }  
      }

      bind = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    close = () => {
        $("#modal").hide()
    }

    add = () => {
        // mengosongkan isi variabel nip, nama, dan alamat
        // set action menjadi "insert"
        $("#modal").show()
        this.setState({
            nip: "",
            nama: "",
            alamat: "",
            action: "insert"
        });
    }

    edit = (item) => {
        /* 
        - mengisikan isi variabel nip, nama, dan alamat sesuai dengan data yang diedit
        - set action menjadi "update"
        */
        $("#modal").show()
        this.setState({
            nip: item.nip,
            nama: item.nama,
            alamat: item.alamat,
            action: "update"
        });
    }

    getPegawai = () => {
        let url = "http://localhost:2000/pegawai";
        // mengakses api untuk mengambil data pegawai
        axios.get(url)
            .then(response => {
                // mengisikan data dari respon API ke array pegawai
                this.setState({ pegawai: response.data.pegawai });
            })
            .catch(error => {
                console.log(error)
            });
    }

    findPegawai = (event) => {
        let url = "http://localhost:2000/pegawai";
        if (event.keyCode === 13) {
            // menampung data keyword pencarian
            let form = {
                find: this.state.search
            }
            // mengakses api untuk mengambil data pegawai berdasarkan keyword
            axios.post(url, form)
                .then(response => {
                    // mengisikan data dari respon API ke array pegawai
                    this.setState({ pegawai: response.data.pegawai });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    savePegawai = (event) => {
        event.preventDefault();
        // menampung data nip, nama, dan alamat dari Form ke dalam FormData() untuk dikirim
        let url = "";
        if (this.state.action === "insert") {
            url = "http://localhost:2000/pegawai/save"
        } else {
            url = "http://localhost:2000/pegawai/update"
        }
        let form = {
            nip: this.state.nip,
            nama: this.state.nama,
            alamat: this.state.alamat
        }

        // mengirim data API untuk disimpan pada database
        axios.post(url, form)
            .then(response => {
                // jika proses simpan berhasil, memanggil data yang terbaru
                this.getPegawai();
            })
            .catch(error => {
                console.log(error);
            });
        // menutup form modal
        $("#modal").hide();
    }

    drop = (nip) => {
        let url = "http://localhost:2000/pegawai/" + nip;
        // memanggil url API untuk menghapus data pada database
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            axios.delete(url)
                .then(response => {
                    // jika proses hapus data berhasil, memanggil data yang terbaru
                    this.getPegawai();
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }

    componentDidMount() {
        // method yang pertama kali dipanggil pada saat load page
        this.getPegawai()
    }

    render() {
      return (
          <div className="m-3 card">
              <div className="card-header bg-dark text-white">Data Pegawai</div>
              <div className="card-body">
                  <input type="text" className="form-control mb-2" name="search" value={this.state.search} onChange={this.bind} onKeyUp={this.findPegawai} placeholder="Pencarian..." />

                  {/* tampilan tabel pegawai */}
                  <table className="table">
                      <thead>
                          <tr>
                              <th>NIP</th>
                              <th>Nama</th>
                              <th>Alamat</th>
                              <th>Option</th>
                          </tr>
                      </thead>
                      <tbody>
                          {this.state.pegawai.map((item, index) => {
                              return (
                                  <tr key={index}>
                                      <td>{item.nip}</td>
                                      <td>{item.nama}</td>
                                      <td>{item.alamat}</td>
                                      <td>
                                          <button className="btn btn-sm btn-info m-1" data-toggle="modal" data-target="#modal" onClick={() => this.edit(item)}>
                                              Edit
                                          </button>
                                          <button className="btn btn-sm btn-danger m-1" onClick={() => this.drop(item.nip)}>
                                              Hapus
                                          </button>
                                      </td>
                                  </tr>
                              );
                          })}
                      </tbody>
                  </table>
                  <button className="btn btn-success" onClick={this.add} data-toggle="modal" data-target="#modal">
                      Tambah Data
                  </button>

                  {/* modal form pegawai */}
                  <div className="modal" id="modal">
                      <div className="modal-dialog">
                          <div className="modal-content">
                              <div className="modal-header">
                                  Form Pegawai
                              </div>
                              <form onSubmit={this.savePegawai}>
                                  <div className="modal-body">
                                      NIP
                                      <input type="number" name="nip" value={this.state.nip} onChange={this.bind} className="form-control" required />
                                      Nama
                                      <input type="text" name="nama" value={this.state.nama} onChange={this.bind} className="form-control" required />
                                      Alamat
                                      <input type="text" name="alamat" value={this.state.alamat} onChange={this.bind} className="form-control" required />
                                  </div>
                                  <div className="modal-footer">
                                      <button className="btn btn-sm btn-success" type="submit">
                                          Simpan
                                      </button>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      );
  }
}

export default Pegawai;