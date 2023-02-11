import EvaluationOutput from '../../../entities/evaluation-output'
import type IEvaluationService from '../evaluation'

export default class DisabledEvaluation implements IEvaluationService {
    public async evaluate(): Promise<EvaluationOutput> {
        throw new Error('Evaluation is disabled')
    }
}
