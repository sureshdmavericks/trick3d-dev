import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { HttpErrorResponse } from "@angular/common/http"

import { throwError, Observable } from "rxjs"
import { environment } from "../../../environments/environment"
import { AuthService } from "../../authentication/auth.service"

export interface AssetData {
  notification: string
  createdAt: string
}

export interface AssetMgntData extends Array<AssetData> {}

@Injectable()
export class AssetService {
  dataUrl = `${environment.API_URL}/assets`
  dataMarkingUrl = `${environment.API_URL}/asset-markings`

  constructor(private http: HttpClient, private _authService: AuthService) {}

  private get authHeader(): string {
    return `Bearer ${this._authService.getToken()}`
  }

  getData() {
    return this.http.get(this.dataUrl, {
      observe: "response",
      headers: new HttpHeaders().set("Authorization", this.authHeader)
    })
  }

  getById(AssetID: string) {
    return this.http.get(`${this.dataUrl}/${AssetID}`, {
      observe: "response",
      headers: new HttpHeaders().set("Authorization", this.authHeader)
    })
  }

  create(data: any): Observable<any> {
    console.log("data:", data)
    let sdata = new FormData()
    sdata.append("CategoryID", data.CategoryID)
    sdata.append("ClientID", data.ClientID)
    sdata.append("Name", data.Name)
    sdata.append("NoOfFeatures", data.NoOfFeatures)
    sdata.append("UploadCount", data.UploadCount)

    if (data.AssetID) sdata.append("AssetID", data.AssetID)
    // if(data.Upload)
    sdata.append("Upload", data.Upload)
    // if(data.AssetBundle)
    sdata.append("AssetBundle", data.AssetBundle)

    return this.http.post(this.dataUrl, sdata, {
      observe: "response",
      headers: new HttpHeaders().set("Authorization", this.authHeader)
    })
  }

  update(data: any, id: string): Observable<any> {
    return this.http.patch(`${this.dataUrl}/${id}`, data, {
      observe: "response",
      headers: new HttpHeaders().set("Authorization", this.authHeader)
    })
  }

  createMarking(data: any, ClientID: string): Observable<any> {
    let sdata = new FormData()
    sdata.append("Title", data.Title)
    sdata.append("Name", data.Name)
    sdata.append("Description", data.Description)
    sdata.append("MarkingNumber", data.MarkingNumber)
    sdata.append("AssetID", data.AssetID)
    sdata.append("CategoryID", data.CategoryID)
    sdata.append("PictureID", data.PictureID)
    if (data.ProductImage) {
      if (Array.isArray(data.ProductImage)) {
        for (let i = 0; i < data.ProductImage.length; i++) {
          sdata.append("ProductImage", data.ProductImage[i])
        }
      } else {
        sdata.append("ProductImage", data.ProductImage)
      }
    }
    if (data.ProductVideo) {
      if (Array.isArray(data.ProductVideo)) {
        for (let i = 0; i < data.ProductVideo.length; i++) {
          sdata.append("ProductVideo", data.ProductVideo[i])
        }
      } else {
        sdata.append("ProductVideo", data.ProductVideo)
      }
    }
    if (data.ProductVideoURL) {
      if (Array.isArray(data.ProductVideoURL)) {
        for (let i = 0; i < data.ProductVideoURL.length; i++) {
          sdata.append("ProductVideoURL", data.ProductVideoURL[i])
        }
      } else {
        sdata.append("ProductVideoURL", data.ProductVideoURL)
      }
    }
    if (data.MarkingImgURL) {
      if (Array.isArray(data.MarkingImgURL)) {
        for (let i = 0; i < data.MarkingImgURL.length; i++) {
          sdata.append("MarkingImgURL", data.MarkingImgURL[i])
        }
      } else {
        sdata.append("MarkingImgURL", data.MarkingImgURL)
      }
    }
    if (data.MarkingVideoURL) {
      if (Array.isArray(data.MarkingVideoURL)) {
        for (let i = 0; i < data.MarkingVideoURL.length; i++) {
          sdata.append("MarkingVideoURL", data.MarkingVideoURL[i])
        }
      } else {
        sdata.append("MarkingVideoURL", data.MarkingVideoURL)
      }
    }

    return this.http.post(`${this.dataMarkingUrl}?cid=${ClientID}`, sdata, {
      observe: "response",
      headers: new HttpHeaders().set("Authorization", this.authHeader)
    })
  }
}
