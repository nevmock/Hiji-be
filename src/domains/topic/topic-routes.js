import TopicController from './topic-controller.js';
import validateCredentials from '../../middlewares/validate-credentials-middleware.js';
import tryCatch from '../../utils/tryCatcher.js';
import { topicCreateSchema, topicUpdateSchema } from './topic-schema.js';
import BaseRoutes from '../../base_classes/base-routes.js';

class TopicRoutes extends BaseRoutes {
    routes() {
        this.router.get('/', [
            tryCatch(TopicController.index)
        ]);
        this.router.get('/:id', [
            tryCatch(TopicController.show)
        ]);
        this.router.get('/lesson/:topicId', [
            tryCatch(TopicController.showByTopicId)
        ]);
        this.router.post('/', [
            validateCredentials(topicCreateSchema),
            tryCatch(TopicController.create)
        ]);
        this.router.put('/:id', [
            validateCredentials(topicUpdateSchema),
            tryCatch(TopicController.update)
        ]);
        this.router.delete('/:id', [
            tryCatch(TopicController.delete)
        ]);
    }
}

export default new TopicRoutes().router;