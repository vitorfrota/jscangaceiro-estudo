import { View } from './View';
import { DateConverter } from '../converters/DateConverter';

export class NegotiationsView extends View {
    template(model){
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>
                
                <tbody>
                ${model.toArray().map(negotiation => {
                    return `
                        <tr>
                            <td>${DateConverter.toText(negotiation.createdAt)}</td>
                            <td>${negotiation.quantity}</td>
                            <td>${negotiation.amount}</td>
                            <td>${negotiation.size}</td>
                        </tr>
                    `
                    }).join('')}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3"></td>
                        <td>${model.sizeTotal}</td>
                    </tr>
                </tfoot>
            </table>
        `
    }
}