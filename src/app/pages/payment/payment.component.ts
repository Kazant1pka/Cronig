import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { ShowService } from 'src/app/services/show.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

class ShopItem implements PaymentItem {
  constructor(public label: string, public desc: string, public sum: any) { }

  get amount(): PaymentCurrencyAmount {
    return {
      currency: 'RUB',
      value: String(this.sum),
    };
  }
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentComponent implements OnInit {
  money: number = 0
  payBonus = this.scs.currentCompany.bonus
  convertBonus: any[] = this.payBonus
    
  items: Array<ShopItem>
  constructor(private scs: ShowService, private auth: AuthService, private router: Router) {
    this.scs.currentCompanyUpdate()
    for (let index = 0; index < this.payBonus.length; index++) {
      this.convertBonus[index].label = this.payBonus[index].bname,
      this.convertBonus[index].desc = this.payBonus[index].bdescription,
      this.convertBonus[index].amount = {currency: 'RUB', value: this.payBonus[index].bsum}
    }
    this.items = this.convertBonus
    console.log(this.items, 'items')
  }

  shippingCart: ReadonlyArray<ShopItem> = [];

  get totalSum() {
    return this.shippingCart.reduce((sum, item) => {
      return sum + item.amount.value;
    }, 0);
  }
  get total(): PaymentItem {
    return {
      label: 'Total',
      amount: {
        currency: 'RUB',
        value: String(this.totalSum+this.money),
      },
    };
  }

  addToShippintCard(item: ShopItem) {
      this.shippingCart = [...this.shippingCart, item];
  } 

  onPayment(response: PaymentResponse) {
    console.log('payment response:', response);
    this.scs.pay(this.totalSum+this.money).subscribe(val=>{
      console.log(val, 'oplate ok')
    })
    this.money = 0
    this.clearShippingCart();
    response.complete();
    this.router.navigate(['/company']);
  }

  onPaymentError(error: string) {
    console.log('payment error:', error);
    this.clearShippingCart();
    this.money = 0
  }

  private clearShippingCart() {
    this.shippingCart = [];
  }

  ngOnInit() {
  }

}
