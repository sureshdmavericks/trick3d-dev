import { Component, OnInit } from "@angular/core"
import {
  ClientManagementData,
  ClientData,
  ClientService
} from "./client.service"
import { Router } from "@angular/router"
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal"
import { ConfirmComponent } from "../modals/confirm/confirm.component"
import * as _ from "lodash"
import swal from "sweetalert2"

@Component({
  templateUrl: "client-management.component.html",
  providers: [ClientService]
})
export class ClientManagementComponent implements OnInit {
  modalRef: BsModalRef
  error: any
  public clients: ClientManagementData
  public filterQuery = ""

  constructor(
    private dataTableService: ClientService,
    private modalService: BsModalService,
    private router: Router
  ) {
    this.dataTableService.getData().subscribe(
      (data: any) => {
        this.clients = _.map(data.body, function(x: ClientData) {
          return _.assign(x, {
            FullName: `${x.FirstName} ${x.LastName ? x.LastName : ""}`.replace(
              /^\/|\/$/g,
              ""
            ),
            isActive: (()=>{
              let active =  _.filter(x.users, (z)=>{
                if(z.RoleID==2 && z.IsActive){
                  return true
                }
              })
              return active;
            })()
          })
        })
      },
      error => (this.error = error)
    )
  }

  ngOnInit() {}

  addClient() {
    this.router.navigateByUrl("/client-form")
  }

  resendLink($event: Event, ClientID: string) {
    if (ClientID) {
      this.dataTableService.resend(ClientID).subscribe(
        response => {
          swal.fire("Yeah!", response.body.message, "success")
        },
        err => {
          swal.fire("Oh!", err.error.error.message, "error")
        }
      )
    }
  }

  public toInt(num: string) {
    return +num
  }

  public sortByWordLength = (a: any) => {
    return a.name.length
  }

  public getDate(regDate: string) {
    const date = new Date(regDate)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    })
  }

  changeStatus(event: any, client: ClientData) {
    if (!client) return
    let Status = event.target.checked
    let { ClientID } = client

    this.modalRef = this.modalService.show(ConfirmComponent, {
      initialState: {
        prompt: "Are you sure you want to do this?",
        callback: (result: string) => {
          if (result == "no") {
            event.target.checked = !event.target.checked
            return
          }
          this.dataTableService.status(Status, ClientID).subscribe(
            (res: any) => {
              console.log(res)
            },
            error => {
              console.log(error)
            }
          )
        }
      }
    })
  }
}
