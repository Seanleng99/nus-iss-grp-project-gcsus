package com.spring.response;

import java.util.ArrayList;
import java.util.List;

import com.spring.response.OrderResponse2;

public class ViewOrderResponse {
	private String status;
	private String message;
	private String AUTH_TOKEN;
	private List<OrderResponse2> orderlist = new ArrayList<>();

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getAUTH_TOKEN() {
		return AUTH_TOKEN;
	}

	public void setAUTH_TOKEN(String aUTH_TOKEN) {
		this.AUTH_TOKEN = aUTH_TOKEN;
	}

	public List<OrderResponse2> getOrderlist() {
		return orderlist;
	}

	public void setOrderlist(List<OrderResponse2> orderlist) {
		this.orderlist = orderlist;
	}

	@Override
	public String toString() {
		return "viewOrdResp [status=" + status + ", message=" + message + ", AUTH_TOKEN=" + AUTH_TOKEN + ", orderlist="
				+ orderlist + "]";
	}

}
