package com.spring.model;

import javax.persistence.Lob;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Payment")
public class Payment {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "payment_id")
	private int paymentid;
	
	@Column(name = "phone_number")
	private String phonenumber;
	
	@Column(name = "payment_type")
	private String paymentType;
	
	@Column(name = "amount")
	private double amount;
	
	@Lob
	@Column(name = "payment_image")
	private byte[] paymentimage;
	
	@Column(name = "order_id")
	private int orderid;

	public int getPaymentid() {
		return paymentid;
	}

	public void setProductid(int paymentid) {
		this.paymentid = paymentid;
	}

	public String getPhonenumber() {
		return phonenumber;
	}

	public void setPhonenumber(String phonenumber) {
		this.phonenumber = phonenumber;
	}

	public String getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public byte[] getPaymentimage() {
		return paymentimage;
	}

	public void setPaymentimage(byte[] paymentimage) {
		this.paymentimage = paymentimage;
	}
	
	public int getOrderid() {
		return orderid;
	}

	public void setOrderid(int orderid) {
		this.orderid = orderid;
	}

	public Payment() {
		super();
	}

	public Payment(int paymentid, String phonenumber, String paymentType, double amount,
			byte[] paymentimage, int orderid) {
		super();
		this.paymentid = paymentid;
		this.phonenumber = phonenumber;
		this.paymentType = paymentType;
		this.amount = amount;
		this.orderid = orderid;
		this.paymentimage = paymentimage;
	}
}